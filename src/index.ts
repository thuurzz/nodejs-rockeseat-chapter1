import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// inicia o servidor
const app: Express = express();

// diz para o express aceitar JSON
app.use(express.json());

// define a porta
const port = process.env.PORT;

// cria servidor na porta definida
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


// Rotas da API

app.get("/", (req: Request, res: Response) => {
    return res.json({
        message: "Servidor ta ON!"
    });
})

app.get("/cursos", (req: Request, res: Response) => {
    const id: number = parseInt(req.query.id as string);
    console.log(id);
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.get("/cursos/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.query.id as string);
    console.log(id);
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.post("/cursos", (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.put("/cursos/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.patch("/cursos/:id", (req: Request, res: Response) => {
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.delete("cursos/:id", (req: Request, res: Response) => {
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

