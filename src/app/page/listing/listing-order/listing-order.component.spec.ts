import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingOrderComponent } from './listing-order.component';

describe('ListingOrderComponent', () => {
  let component: ListingOrderComponent;
  let fixture: ComponentFixture<ListingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
