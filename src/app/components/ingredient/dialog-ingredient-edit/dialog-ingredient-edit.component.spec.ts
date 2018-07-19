import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIngredientEditComponent } from './dialog-ingredient-edit.component';

describe('DialogIngredientEditComponent', () => {
  let component: DialogIngredientEditComponent;
  let fixture: ComponentFixture<DialogIngredientEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIngredientEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIngredientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
