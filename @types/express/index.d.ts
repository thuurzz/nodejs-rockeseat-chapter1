import express from "express";
declare global {
  namespace Express {
    interface Request {
      customer: { cpf: string; name: string; id: string; statement: any[] };
    }
  }
}
