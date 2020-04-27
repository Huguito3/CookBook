import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEitComponent } from './recipe-eit.component';

describe('RecipeEitComponent', () => {
  let component: RecipeEitComponent;
  let fixture: ComponentFixture<RecipeEitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
