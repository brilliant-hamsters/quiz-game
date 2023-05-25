import { Store } from '@reduxjs/toolkit'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'
import cors from 'cors'
import * as fs from 'fs'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import { createClientAndConnect, themeClass } from './db'
import bodyParser from 'body-parser'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001
  const distPath = path.resolve('../client/dist')
  const srcPath = path.resolve('../client')
  const ssrClientPath = path.resolve('../client/ssr-dist/client.cjs')
  let vite: ViteDevServer | undefined

  app.use(cors())

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

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/theme', (req, res) => {
    const { body } = req
    if (body) {
      themeClass.create(body)
      res.status(201).send('Added')
    }
    res.send('false')
  })

  app.put('/theme', async (req, res) => {
    const { body } = req
    if (body) {
      await themeClass.update(
        { isTheme: false },
        {
          where: {
            isTheme: true,
          },
        }
      )

      await themeClass.update(
        { isTheme: true },
        {
          where: {
            theme: body.theme,
          },
        }
      )

      res.status(200).send('UPDATE')
      return
    }
  })

  app.get('/theme', async (req, res) => {
    const { body } = req
    const resul = await themeClass.findOne({ where: body })

    res.status(200).send(resul)
  })

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
      const initialStore = JSON.stringify(store);

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

  await createClientAndConnect()

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
