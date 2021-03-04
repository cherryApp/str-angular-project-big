import { Category } from './category';

export class Product extends Category {
    id: number = 0;
    name: string = '';
    type: string = '';
    catID: number = 0;
    description: string = '';
    price: number = 0;
    featured: boolean = false;
    active: boolean = true;

    [param: string]: any;

    constructor(properties?: Product) {
      super();
      if (properties) {
          this.id = properties.id || 0;
          this.name = properties.name || '';
          this.type = properties.type || '';
          this.catID = properties.catID || 0;
          this.description = properties.description || '';
          this.price = properties.price || 0;
          this.featured = properties.featured || false;
          this.active = properties.active || true;
      }
  }
}
