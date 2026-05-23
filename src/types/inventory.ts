export interface InventoryItem {
  inventoryId: string;

  productId: string;
  warehouseId: string;

  productName: string;
  warehouseName: string;

  price: number;

  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
}