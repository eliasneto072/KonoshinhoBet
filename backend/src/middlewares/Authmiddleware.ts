import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

//Declarando uma interface estendida para o Request, esse trecho esta em src/types em um arquivo .d.ts (declaração de tipos)
//declare global{
//    namespace Express{
//        interface Request{
//            userId?: number
//        }
//    }
//}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1]
    const jwtSecret = process.env.JWT_SECRET as string

    if (!token){
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    if (!jwtSecret) {
        return res.status(500).json({ error: 'Erro de configuração do servidor'})
    }

    // 2. Verificação segura do token
    try {
        
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload

        // Validação segura do payload
        if (typeof decoded.id !== 'number') {
            return res.status(401).json({ error: 'Estrutura do token inválida, O TIPO DEVE SER NUMBER!' })
        }

        // evitar usar any (req as any).user = decoded.id
        req.userId = decoded.id
        next()
    

    } catch(error) {

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado!' })
        }
        
        return res.status(401).json({ error: 'Token inválido'})
    }

}

export default authMiddleware