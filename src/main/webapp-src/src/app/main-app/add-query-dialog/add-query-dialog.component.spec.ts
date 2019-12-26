import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQueryDialogComponent } from './add-query-dialog.component';

describe('AddQueryDialogComponent', () => {
  let component: AddQueryDialogComponent;
  let fixture: ComponentFixture<AddQueryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQueryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQueryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
