export interface Order {
  id?: number;
  userId: number;
  productId: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
