import express from 'express'
import userRouter from './routes/UserRouter';

//dotenv.config()

const app = express();

// Middlewares
//app.use(cors())

app.use(express.json())

// Rotas

app.use('/users', userRouter)

const PORT =  process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${PORT}/ `);
})