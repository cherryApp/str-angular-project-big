import { Address } from './address';
export class Customer {
  id: number=0;
  firstName: string='';
  lastName: string='';
  email: string='';
  address: Address=new Address();
  active: boolean=false;
}
export class Attribute {
  title:string='';
  type:string='';
  obj:string='';
  order:string='';
  headOrder:number;
}
export class CustomerAttributes{
  id =        {title:"ID",        type:"text",  obj:"",         order:"", columnOrder:0};
  firstName = {title:"Firstname", type:"text",  obj:"",         order:"", columnOrder:1};
  lastName =  {title:"Lastname",  type:"text",  obj:"",         order:"", columnOrder:2};
  email =     {title:"Email",     type:"text",  obj:"",         order:"", columnOrder:3};
  zip =       {title:"Zip",       type:"text",  obj:"address",  order:"", columnOrder:4};
  country =   {title:"Country",   type:"text",  obj:"address",  order:"", columnOrder:5};
  city =      {title:"City",      type:"text",  obj:"address",  order:"", columnOrder:6};
  street =    {title:"Street",    type:"text",  obj:"address",  order:"", columnOrder:7};
  notes =     {title:"Notes",     type:"text",  obj:"address",  order:"", columnOrder:8};
  active =    {title:"Active",    type:"check", obj:"",         order:"", columnOrder:9};
}
export const CustomerAttributesArray = [
  {key:'id',        title:"ID",        type:"text",  obj:"",         order:"", columnOrder:0},
  {key:'firstName', title:"Firstname", type:"text",  obj:"",         order:"", columnOrder:1},
  {key:'lastName',  title:"Lastname",  type:"text",  obj:"",         order:"", columnOrder:2},
  {key:'email',     title:"Email",     type:"text",  obj:"",         order:"", columnOrder:3},
  {key:'zip',       title:"Zip",       type:"text",  obj:"address",  order:"", columnOrder:4},
  {key:'country',   title:"Country",   type:"text",  obj:"address",  order:"", columnOrder:5},
  {key:'city',      title:"City",      type:"text",  obj:"address",  order:"", columnOrder:6},
  {key:'street',    title:"Street",    type:"text",  obj:"address",  order:"", columnOrder:7},
  {key:'notes',     title:"Notes",     type:"text",  obj:"address",  order:"", columnOrder:8},
  {key:'active',    title:"Active",    type:"check", obj:"",         order:"", columnOrder:9},
]