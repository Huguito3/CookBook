import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoopingListEditComponent } from './shooping-list-edit.component';

describe('ShoopingListEditComponent', () => {
  let component: ShoopingListEditComponent;
  let fixture: ComponentFixture<ShoopingListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoopingListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoopingListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
