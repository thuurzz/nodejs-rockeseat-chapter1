import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


app.get("/", (req: Request, res: Response) => {
    return res.json({
        message: "Servidor ta ON!"
    });
})

app.get("/cursos", (req: Request, res: Response) => {
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.get("/cursos/:id", (req: Request, res: Response) => {
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.post("/cursos", (req: Request, res: Response) => {
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.put("/cursos/:id", (req: Request, res: Response) => {
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

app.patch("/cursos/:id", (req: Request, res: Response) => {
    return res.json(
        ["Curso1", "Curso2", "Curso3"]
    );
});

