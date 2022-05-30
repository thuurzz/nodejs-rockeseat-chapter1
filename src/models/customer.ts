import { Operation } from "./operation";

export interface Customer {
  cpf: string;
  name: string;
  id: string;
  statement: Operation[];
}
