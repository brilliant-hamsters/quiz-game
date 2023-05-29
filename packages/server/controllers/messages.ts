import sequelize from '../sequelize'
import { getIdParam } from '../utils/utils'
import { Request, Response } from 'express'

const { models } = sequelize

export async function create(req: Request, res: Response) {
  if (req.body.id) {
    res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
  } else if (!req.body.author || !req.body.message || !req.body.themeId) {
    res.status(400).send('Bad request: author, message and themeId should be provided.')
  } else {
    const message = await models.message.create({
      author: req.body.author,
      message: req.body.message,
      themeId: req.body.themeId,
      responseToMessageId: req.body.responseToMessageId ?? null,
      likes: 0
    })

    res.status(201).send(message)
  }
}

export async function update(req: Request, res: Response) {
  const id = getIdParam(req)

  if (req.body.id === id) {
    const result = await models.message.update(req.body, {
      where: {
        id: id
      }
    })

    if (result[0] !== 0) {
      res.status(200).end()
    } else {
      res.status(304).send('Nothing changed.')
    }
  } else {
    res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`)
  }
}

export async function remove(req: Request, res: Response) {
  const id = getIdParam(req)
  const result = await models.message.destroy({
    where: {
      id: id
    }
  })

  if (result) {
    res.status(200).end()
  } else {
    res.status(304).send('Nothing changed.')
  }
}
