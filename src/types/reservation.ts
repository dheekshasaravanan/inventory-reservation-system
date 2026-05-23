export interface Reservation {
  id: string;

  productId: string;
  warehouseId: string;

  quantity: number;

  status: string;

  expiresAt: string;

  createdAt: string;
}