import { Request, Response } from 'express'
import Table from '../../../data/Table'

export const list = async (req: Request, res: Response) => {
  const rounds = await Table.scan().exec()

  res.status(200).json({ rows: rounds })
}
