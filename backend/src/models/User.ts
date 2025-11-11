import { IUser } from "./interfaces/IUser";

export class User implements IUser {
  id: number;
  name?: string;
  email: string;
  password: string;
  cpf: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.cpf = data.cpf;
    this.birthDate = data.birthDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
