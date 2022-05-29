import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

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
const customers: {
  cpf: string;
  name: string;
  id: string;
  statement: any[];
}[] = [];

function verifyIfExistCPF(
  request: Request,
  response: Response,
  next: Function
) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => {
    if (customer.cpf === cpf) {
      return customer;
    }
  });

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  request.customer = customer;

  return next();
}

function getBalance(statement: any[]) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

// Rotas da API
app.get("/", (request: Request, response: Response) => {
  return response.json({
    message: "Servidor ta ON!",
  });
});

app.post("/account", (request: Request, response: Response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({
      error: "Customer already exists!",
    });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).json(customers);
});

app.get(
  "/statement/",
  verifyIfExistCPF,
  (request: Request, response: Response) => {
    const { customer } = request;

    return response.status(200).json(customer.statement);
  }
);

app.post(
  "/deposit",
  verifyIfExistCPF,
  (request: Request, response: Response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
      description,
      amount,
      created_at: new Date(),
      type: "credit",
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
  }
);

app.post(
  "/withdraw",
  verifyIfExistCPF,
  (request: Request, response: Response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
      return response.status(400).json({ error: "Insufficient funds!" });
    }

    const statementOperation = {
      amount,
      created_at: new Date(),
      type: "debit",
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
  }
);

app.get(
  "/statement/date",
  verifyIfExistCPF,
  (request: Request, response: Response) => {
    const { customer } = request;

    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statementByDate = customer.statement.filter(
      (statement) =>
        statement.created_at.toDateString() ==
        new Date(dateFormat).toDateString()
    );

    return response.status(200).json(statementByDate);
  }
);
