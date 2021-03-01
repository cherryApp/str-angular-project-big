import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategroyListComponent } from './categroy-list.component';

describe('CategroyListComponent', () => {
  let component: CategroyListComponent;
  let fixture: ComponentFixture<CategroyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategroyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategroyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
