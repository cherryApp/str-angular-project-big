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
  id = {title:"ID", type:"text", obj:""};
  firstName = {title:"Firstname", type:"text", obj:""};
  lastName = {title:"Lastname", type:"text", obj:""};
  email = {title:"Email", type:"text", obj:""};
  zip = {title:"Zip", type:"text", obj:"address"};
  country = {title:"Country", type:"text", obj:"address"};
  city = {title:"City", type:"text", obj:"address"};
  street = {title:"Street", type:"text", obj:"address"};
  notes = {title:"Notes", type:"text", obj:"address"};
  active = {title:"Active", type:"check", obj:""};
}