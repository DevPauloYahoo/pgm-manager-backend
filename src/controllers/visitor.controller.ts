import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class VisitorController {
  async create(req: Request, res: Response) {
    const visitor = await prisma.visitor.create({
      data: {
        name: req.body.name,
        document: req.body.document,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(201).json(visitor);
  }

  async listAll(req: Request, res: Response) {
    const visitors = await prisma.visitor.findMany();

    res.status(200).json(visitors);
  }
}
