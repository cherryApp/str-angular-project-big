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
  id =        {title:"ID",        type:"text",  obj:"",         order:""};
  firstName = {title:"Firstname", type:"text",  obj:"",         order:""};
  lastName =  {title:"Lastname",  type:"text",  obj:"",         order:""};
  email =     {title:"Email",     type:"text",  obj:"",         order:""};
  zip =       {title:"Zip",       type:"text",  obj:"address",  order:""};
  country =   {title:"Country",   type:"text",  obj:"address",  order:""};
  city =      {title:"City",      type:"text",  obj:"address",  order:""};
  street =    {title:"Street",    type:"text",  obj:"address",  order:""};
  notes =     {title:"Notes",     type:"text",  obj:"address",  order:""};
  active =    {title:"Active",    type:"check", obj:"",         order:""};
}