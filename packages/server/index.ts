import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import * as fs from 'fs'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
//import cors from 'cors'
import { Store } from '@reduxjs/toolkit'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import setupDatabase from './sequelize/db-setup'
import assertDatabaseConnectionOk from './sequelize/db-connect'
import * as themes from './controllers/themes'
import * as messages from './controllers/messages'
import * as schemes from './controllers/schemes'
import dotenv from 'dotenv'
dotenv.config()

function makeHandlerAwareOfAsyncErrors(
  handler: (req: Request, res: Response) => unknown
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.entries(req.cookies).length === 0) {
        throw new Error('Invalid cookies')
      }

      await handler(req, res)
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid cookies') {
        res.status(403).send(error.message)
      } else {
        res.status(500).send(error)
      }

      next(error)
    }
  }
}

const allowLIst: string[] = [
  'http://localhost',
  'https://quiz-to-senior.ya-praktikum.tech',
]

async function startServer() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001
  const distPath = path.resolve(__dirname, '../client/dist')
  const srcPath = path.resolve(__dirname, '../client')
  const ssrClientPath = path.resolve(__dirname, '../client/ssr-dist/client.cjs')
  let vite: ViteDevServer | undefined
  const isDev = () => process.env.NODE_ENV === 'development'

  await assertDatabaseConnectionOk()
  await setupDatabase()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  app.use((req, res, next) => {
    const { origin } = req.headers
    const { method } = req
    const requestHeaders = req.headers['access-control-request-headers']
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'
    if (allowLIst.includes(origin!)) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Credentials', 'true')
      if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', requestHeaders)
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS)
        return res.end()
      }
    }
    return next()
  })

  /* GET запросы */

  // Получение всех тем форума
  app.get(`/api/themes`, makeHandlerAwareOfAsyncErrors(themes.getAll))
  // Получение конкретной темы с сообщениями по id
  app.get(`/api/themes/:id`, makeHandlerAwareOfAsyncErrors(themes.getById))
  // Получение цветовой схемы по userId
  app.get(`/api/theme/:id`, makeHandlerAwareOfAsyncErrors(schemes.getById))

  /* POST запросы */

  // Создание новой темы форума
  app.post(`/api/themes`, makeHandlerAwareOfAsyncErrors(themes.create))
  // Создание нового сообщения в теме форума
  app.post(`/api/themes/:id`, makeHandlerAwareOfAsyncErrors(messages.create))
  // Добавление пользователя с цветовой схемой
  app.post(`/api/theme`, makeHandlerAwareOfAsyncErrors(schemes.create))

  /* PUT запросы */

  // Изменение темы по id
  app.put(`/api/themes/:id`, makeHandlerAwareOfAsyncErrors(themes.update))
  // Изменение сообщения по id
  app.put(`/api/messages/:id`, makeHandlerAwareOfAsyncErrors(messages.update))
  // Изменения цветовой схемы по userId
  app.put(`/api/theme/:id`, makeHandlerAwareOfAsyncErrors(schemes.update))

  /* DELETE запросы */

  // Удаление темы по id
  app.delete(`/api/themes/:id`, makeHandlerAwareOfAsyncErrors(themes.remove))
  // Удаление сообщения по id
  app.delete(
    `/api/messages/:id`,
    makeHandlerAwareOfAsyncErrors(messages.remove)
  )

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string, store: Store) => Promise<string>
      let createStore: () => Store

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
        createStore = (await import(ssrClientPath)).createStore
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
        createStore = (
          await vite!.ssrLoadModule(path.resolve(srcPath, 'src/store/index.ts'))
        ).createStore
      }

      const store: Store = createStore()
      const appHtml = await render(url, store)
      const initialStore = JSON.stringify(store)

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--store-data-->', initialStore)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
