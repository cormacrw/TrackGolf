import { Request, Response } from 'express'

export const create = (req: Request, res: Response) => {
  console.log('hello!')
  res.status(200).json({ message: 'hello!' })
}
