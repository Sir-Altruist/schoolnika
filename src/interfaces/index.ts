import * as Sequelize from "sequelize";

export interface ErrorResponse {
  code: number;
  message: string;
}

export interface UserRequestBody {
  id?: number;
  username?: string;
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserRequestBody> {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseType {
  dataValues?:  {
      id: number;
      password: string;
      email: string;
    }
}

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}