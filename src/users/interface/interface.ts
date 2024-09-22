import { Request } from 'express';

export interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
