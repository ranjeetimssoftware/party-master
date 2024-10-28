import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericNestedDropdownComponent } from './generic-nested-dropdown.component';

describe('GenericNestedDropdownComponent', () => {
  let component: GenericNestedDropdownComponent;
  let fixture: ComponentFixture<GenericNestedDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericNestedDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericNestedDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
