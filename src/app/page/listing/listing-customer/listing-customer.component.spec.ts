import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCustomerComponent } from './listing-customer.component';

describe('ListingCustomerComponent', () => {
  let component: ListingCustomerComponent;
  let fixture: ComponentFixture<ListingCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
