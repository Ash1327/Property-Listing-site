export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  CONDO = 'Condo',
  TOWNHOUSE = 'Townhouse',
  VILLA = 'Villa'
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  price: number | string;
  location: string;
  description: string;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  createdAt: Date;
} 