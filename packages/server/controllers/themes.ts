import sequelize from '../sequelize'
import { getIdParam } from '../utils/utils'
import { Request, Response } from 'express'

const { models } = sequelize

export async function getAll(_: Request, res: Response) {
  const themes = await models.theme.findAll()
  res.status(200).json(themes)
}

export async function getById(req: Request, res: Response) {
  const id = getIdParam(req)
  const themes = await models.theme.findByPk(id, { include: models.message })

  if (themes) {
    res.status(200).json(themes)
  } else {
    res.status(404).send('404 - Not found.')
  }
}

export async function create(req: Request, res: Response) {
  if (req.body.id) {
    res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
  } else if (!req.body.theme) {
    res.status(400).send('Bad request: Не передано обязательное поле theme.')
  } else{
    const theme = await models.theme.create({
      theme: req.body.theme
    })

    res.status(201).send(theme)
  }
}

export async function update(req: Request, res: Response) {
  const id = getIdParam(req)

  if (req.body.id === id) {
    const result = await models.theme.update(req.body, {
      where: {
        id: id
      }
    })

    if (result[0] !== 0) {
      res.status(200).end()
    } else {
      res.status(400).send('Ничего не изменилось, или что-то пошло не так. Возможно такого id не существует.')
    }
  } else {
    res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`)
  }
}

export async function remove(req: Request, res: Response) {
  const id = getIdParam(req)
  const result = await models.theme.destroy({
    where: {
      id: id
    }
  })

  if (result) {
    res.status(200).end()
  } else {
    res.status(400).send('Что-то пошло не так, возможно такого id не существует.')
  }
}
