import { Request, Response } from 'express'
import Main from '../../../data/models/Main'

export const list = async (req: Request, res: Response) => {
  const rounds = await Main.scan().exec()

  res.status(200).json({ rows: rounds })
}
