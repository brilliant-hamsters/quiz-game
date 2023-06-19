import sequelize from '../sequelize'
import { getIdParam } from '../utils/utils'
import { Request, Response } from 'express'

const { models } = sequelize

export async function getById(req: Request, res: Response) {
  const id = getIdParam(req)
  const scheme = await models.scheme.findOne({
    where: {
      userId: id
    }
  })

  if (scheme) {
    res.status(200).json(scheme)
  } else {
    res.status(404).send(`404 - User with id ${id} not found.`)
  }
}

export async function create(req: Request, res: Response) {
  if (!req.body.userId) {
    res.status(400).send(`Bad request: user ID should be provided.`)
  } else {
    const user = await models.scheme.findOne({
      where: {
        userId: req.body.userId
      }
    })

    if (user) {
      res.status(403).send(`Bad request: user already exist.`)
    } else {
      const scheme = await models.scheme.create({
        userId: req.body.userId,
        theme: req.body.theme || 'light',
      })

      res.status(201).send(scheme)
    }
  }
}

export async function update(req: Request, res: Response) {
  const id = getIdParam(req)

  if (req.body.userId !== id) {
    res.status(400).send(`Bad request: param user ID (${id}) does not match body ID (${req.body.id}).`)
  } else if (!req.body.theme) {
    res.status(400).send(`Bad request: theme should be provided.`)
  } else {
    const user = await models.scheme.findOne({
      where: {
        userId: req.body.userId
      }
    })

    if (!user) {
      res.status(400).send(`Bad request: user not exist.`)
    } else {
      const result = await models.scheme.update({
        theme: req.body.theme
      }, {
        where: {
          userId: id
        }
      })

      if (result[0] !== 0) {
        res.status(200).end()
      } else {
        res.status(304).send('Nothing changed.')
      }
    }
  }
}
