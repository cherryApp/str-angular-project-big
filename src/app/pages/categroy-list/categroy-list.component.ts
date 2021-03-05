import { Category, CategoryAttributes } from './../../model/category';
import { CategoryService ,ColumnSortOrder} from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-categroy-list',
  templateUrl: './categroy-list.component.html',
  styleUrls: ['./categroy-list.component.css']
})
export class CategroyListComponent implements OnInit {

  categoryList$: BehaviorSubject<Category[]> = this.categoryService.list$;

  phrase: string = '';
  filterKey = 'id';
  myArray: Category[]=[];
  arrayLength: number=0;
  sorterKey: string ='';
  delCategory: Category={id:0, name:'', description: ''};
  pText: string="Enter filtering phrase...";
  i: number=0;
  animPlaceholder: any='';

  attributes = new CategoryAttributes();

  constructor( private categoryService: CategoryService) {
    
   }

  ngOnInit():any {
    this.categoryService.getAll();
    this.categoryList$.subscribe(
      val=> {this.myArray=val;
        this.myLength()},         
    );       
    this.animPlaceholder=setInterval(()=> {if(this.i==this.pText.length) 
      {this.i=0 }else{
        this.i++;
      }
      let printOut: string =this.pText.slice(0,this.i);    
      $(".filter-field").attr('placeholder',printOut);
      // console.log("start");
    }
      , 100)
  }
  ngOnDestroy(): void{
    // console.log("Stop");
    clearInterval(this.animPlaceholder)
  }
  myLength(){
    this.arrayLength=this.myArray.length
            
  }
  setCategoryDelete(category: Category): void {
    this.delCategory = category;
    
    $('#confirmationDialog').on('show.bs.modal', function () {
      // $('#confirmationDialog').modal('show');
      $('#cancelButton').trigger('focus')
    })
    $('#confirmationDialog').on('hidden.bs.modal', function () {
      let deleteIcon = document.querySelector(".fa-spinner");
      if (deleteIcon !== null) {
        deleteIcon.classList.remove("fa-spinner", "fa-pulse");
        deleteIcon.classList.add("fa-trash");
      }
    })
  }

  onDelete(category: Category): void {
    this.categoryService.remove(category);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    this.filterKey = (event.target as HTMLInputElement).value;
  }

  setDefault(key): boolean {
    return key === "id" ? true : false;
  }
  
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  onColumnSelect(key: string): void {
    this.sorterKey = key;
    let clicked = true;
    
    if (this.sortOrder[key] === "none" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    if (this.sortOrder[key] === "ascending" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "descending"
      clicked = false;
    }

    if (this.sortOrder[key] === "descending" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    this.sortDirection = this.sortOrder[key];
    console.log(this.sortDirection);
  }
    eraseSortDirections(): void {
      for (let key in this.sortOrder) {
        this.sortOrder[key] = "none";
      }
    }
    
    sortDirection = "none";
    
    sortOrder = new ColumnSortOrder();

    speak(text: string){
      let msg = new SpeechSynthesisUtterance(); msg.text =text; 
      msg.rate = 0.5;
      window.speechSynthesis.speak(msg);  }



}