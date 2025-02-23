export interface InventoryItem {
  name: string;
  price: number;
  available_units: number;
  display_image_url: string;
}

export type Cart = {
  item?: InventoryItem | null;
  selectedQty?: number;
};
