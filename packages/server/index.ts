import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import * as fs from 'fs'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Store } from '@reduxjs/toolkit'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import setupDatabase from './sequelize/db-setup'
import assertDatabaseConnectionOk from './sequelize/db-connect'
import * as themes from './controllers/themes'
import * as messages from './controllers/messages'
import sequelize from './sequelize'
import dotenv from 'dotenv'
import { themeClass } from './db'
import { createClientAndConnect } from './db'
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

async function startServer() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001
  const distPath = path.resolve(__dirname, '../client/dist')
  const srcPath = path.resolve(__dirname, '../client')
  const ssrClientPath = path.resolve(__dirname, '../client/ssr-dist/client.cjs')
  let vite: ViteDevServer | undefined
  const isDev = () => process.env.NODE_ENV === 'development'

  const controllers = {
    themes,
    messages,
  }

  await assertDatabaseConnectionOk()
  await setupDatabase()

  const authCheker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authCookie = await req.cookies.auth
    console.log('AUTHSERVER', req.cookies.auth)
    if (authCookie) {
      return next()
    }
    res.redirect('/auth')
  }
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  app.use(cors())

  app.post('/authUser', async (req, res) => {
    const { body } = req

    if (body) {
      try {
        const resul = await sequelize.models.currentUser.create(body)
        res.cookie('auth', body.userId, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
        })
        res.status(201).send(resul)
      } catch (error) {
        console.log(error)
        res.status(200).send('Такой пользователь уже существует!')
      }
    }
  })

  app.get(
    `/api/themes`,
    authCheker,
    makeHandlerAwareOfAsyncErrors(themes.getAll)
  )
  app.get(`/api/themes/:id`, makeHandlerAwareOfAsyncErrors(themes.getById))

  for (const [routeName, routeController] of Object.entries(controllers)) {
    app.post(
      `/api/${routeName}`,
      authCheker,
      makeHandlerAwareOfAsyncErrors(routeController.create)
    )
    app.put(
      `/api/${routeName}/:id`,
      authCheker,
      makeHandlerAwareOfAsyncErrors(routeController.update)
    )
    app.delete(
      `/api/${routeName}/:id`,
      authCheker,
      makeHandlerAwareOfAsyncErrors(routeController.remove)
    )
  }

  app.delete('/authUser', authCheker, async (req, res) => {
    const { body } = req
    if (body) {
      try {
        const resul = await sequelize.models.currentUser.destroy({
          where: {
            userId: body.userId,
          },
        })
        res.clearCookie('auth')
        console.log('SERVERDELETE', resul)
        res.status(200).send('DELETE')
      } catch (error) {
        console.log(error)
        res.status(404)
      }
    }
  })
  app.get('/authUser', authCheker, async (req, res) => {
    const { body } = req
    if (body) {
      try {
        const resul = await sequelize.models.currentUser.findOne({
          where: { userId: body.userId },
        })
        console.log('GET', resul)
        res.status(200).send(resul)
      } catch (error) {
        console.log(error)
        res.status(404).send('error')
      }
    }
    console.log('COOKIES', body.userId)
  })

  app.put('/theme', authCheker, async (req, res) => {
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

  app.get('/theme', authCheker, async (req, res) => {
    const { body } = req
    const resul = await themeClass.findOne({ where: body })

    res.status(200).send(resul)
  })

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

  app.use(
    '*',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const url = req.originalUrl

      try {
        let template: string

        if (!isDev()) {
          template = fs.readFileSync(
            path.resolve(distPath, 'index.html'),
            'utf-8'
          )
        } else {
          template = fs.readFileSync(
            path.resolve(srcPath, 'index.html'),
            'utf-8'
          )

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          template = await vite!.transformIndexHtml(url, template)
        }

        let render: (url: string, store: Store) => Promise<string>
        let createStore: (initialStore: any) => Store

        if (!isDev()) {
          render = (await import(ssrClientPath)).render
          createStore = (await import(ssrClientPath)).createStore
        } else {
          render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
            .render
          createStore = (
            await vite!.ssrLoadModule(
              path.resolve(srcPath, 'src/store/index.ts')
            )
          ).createStore
        }

        const checkAuth = () => {
          return {
            auth: {
              error: null,
              isLoading: false,
              loggedIn: false,
              serviceId: null,
              user: null,
              verificate: false,
            },
            forum: {
              error: null,
              isLoading: false,
              loggedIn: false,
              messages: [],
              themesList: [],
            },

            leaderboard: { error: null, isLoading: false, leaderboard: [] },
            profile: { error: null, isLoading: false, user: null },
          }
        }

        const store: Store = createStore(checkAuth())
        const appHtml = await render(url, store)
        const initialStore = JSON.stringify(store.getState())

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
    }
  )

  await createClientAndConnect()

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
