import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client'

// MELHORAR ESSE CODIGO!!!

export class UserController {
    
// REGISTRO DE USUÁRIO
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, cpf, birthDate, name } = req.body;

      if (!email || !password || !cpf || !birthDate) {
        res.status(400).json({ error: 'Campos obrigatórios: email, password, cpf e birthDate' });
        return;
      }

      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { cpf }] },
      });

      if (existingUser) {
        res.status(409).json({ error: 'Usuário com este e-mail ou CPF já existe' });
        return;
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashed,
          cpf,
          birthDate: new Date(birthDate),
          name,
        },
      });

      res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
  }

  // LOGIN
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, cpf, birthDate } = req.body;

      if (!email || !password || !cpf || !birthDate) {
        res.status(400).json({ error: 'Campos obrigatórios: email, password, cpf e birthDate' });
        return;
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        res.status(401).json({ error: 'Usuário não encontrado' });
        return;
      }

      // Valida CPF e data de nascimento
      if (user.cpf !== cpf) {
        res.status(401).json({ error: 'CPF incorreto' });
        return;
      }

      if (new Date(user.birthDate).toISOString().split('T')[0] !== new Date(birthDate).toISOString().split('T')[0]) {
        res.status(401).json({ error: 'Data de nascimento incorreta' });
        return;
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        res.status(401).json({ error: 'Senha inválida' });
        return;
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erro ao fazer login' });
    }
  }

  // PERFIL
  public async profile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      res.json({
        id: user.id,
        email: user.email,
        cpf: user.cpf,
        birthDate: user.birthDate,
        name: user.name,
        createdAt: user.createdAt,
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
