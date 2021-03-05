export class Product {
    id: number = 0;
    name: string = '';
    type: string = '';
    catID: number = 0;
    description: string = '';
    price: number = 0;
    stock: number = 0;
    featured: boolean = false;
    active: boolean = false;
}

export class ProductAttributes {
    id: string = "ID";
    name: string = 'Name';
    type: string = 'Type';
    catID: string = 'Category'
    description: string = 'Description'
    price: string = 'Price'
    stock: string = 'Stock'
    featured: string = 'Featured'
    active: string = 'Active'
}

export class ProductSummaryData {
    totalProducts: number = 0;
    totalItems: number = 0;
    totalValue: number = 0;
    totalActive: number = 0;
    totalFeatured: number = 0;
    totalinCategories: Array<number> = [0,0,0,0,0];
  }