import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFabMenuComponent } from './recipe-fab-menu.component';

describe('RecipeFabMenuComponent', () => {
  let component: RecipeFabMenuComponent;
  let fixture: ComponentFixture<RecipeFabMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeFabMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
