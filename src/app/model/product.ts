export class Product {
    id: number = 0;
    name: string = '';
    type: string = '';
    catID: number = 0;
    description: string = '';
    price: number = 0;
    featured: boolean = false;
    active: boolean = false;
}

export class ProductAttributes {
    id: string = "ID";
    name: string = 'Name';
    type: string = 'Type';
    catID: string = 'Category ID'
    description: string = 'Description'
    price: string = 'Price'
    featured: string = 'Featured'
    active: string = 'Active'
}