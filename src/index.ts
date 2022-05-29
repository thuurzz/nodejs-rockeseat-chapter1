import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

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

// Lista na memória
const customers: { cpf: string; name: string; id: string; statement: string[]; }[] = [];

// base para URL/
app.get("/", (req: Request, res: Response) => {
    return res.json({
        message: "Servidor ta ON!"
    });
})

// Rotas da API
app.post("/account", (req: Request, res: Response) =>{
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);
  
  if (customerAlreadyExists) {
    return res.status(400).json({
      error: "Customer already exists!"
    });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return res.status(201).json(customers);
})

app.get("/statement/", (req: Request, res: Response) => {
  const { cpf }  = req.headers;

  const costumer = customers.find((customer) => {
    if (customer.cpf === cpf) {
      return customer
    }
  });

  if (costumer) {
    return res.json(costumer.statement);
  } else {
    return res.status(400).json({ error: "Customer not found!" });
  }
})

