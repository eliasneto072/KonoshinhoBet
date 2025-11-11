import { PrismaClient } from '@prisma/client';

// Evita múltiplas instâncias do Prisma em modo dev (especialmente útil com ts-node-dev)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Cria uma única instância reutilizável
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // opcional — mostra logs úteis
  });

// Em ambiente de desenvolvimento, guarda a instância no escopo global
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
