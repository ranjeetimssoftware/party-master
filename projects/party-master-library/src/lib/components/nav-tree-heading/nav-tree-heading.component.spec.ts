import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTreeHeadingComponent } from './nav-tree-heading.component';

describe('NavTreeHeadingComponent', () => {
  let component: NavTreeHeadingComponent;
  let fixture: ComponentFixture<NavTreeHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTreeHeadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTreeHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
