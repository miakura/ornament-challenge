export interface User {
  id?: number;
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
