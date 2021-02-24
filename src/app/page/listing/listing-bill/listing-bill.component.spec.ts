import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBillComponent } from './listing-bill.component';

describe('ListingBillComponent', () => {
  let component: ListingBillComponent;
  let fixture: ComponentFixture<ListingBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
