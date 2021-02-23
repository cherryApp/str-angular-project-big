import { Address } from './address';
export class Customer {
  id: number=0;
  firstName: string='';
  lastName: string='';
  email: string='';
  address: Address=new Address();
  active: boolean=false;
}
export class CustomerAttributes{
  id: string="ID";
  firstName: string="Firstname";
  lastName: string="LastName";
  email: string="Email";
  address: string="Address";
  active: string="Active";
}
