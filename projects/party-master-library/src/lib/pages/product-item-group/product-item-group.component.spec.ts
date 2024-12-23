import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemGroupComponent } from './product-item-group.component';

describe('ProductItemGroupComponent', () => {
  let component: ProductItemGroupComponent;
  let fixture: ComponentFixture<ProductItemGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItemGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
