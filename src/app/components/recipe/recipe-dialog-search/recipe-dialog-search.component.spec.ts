import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDialogSearchComponent } from './recipe-dialog-search.component';

describe('RecipeDialogSearchComponent', () => {
  let component: RecipeDialogSearchComponent;
  let fixture: ComponentFixture<RecipeDialogSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDialogSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDialogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
