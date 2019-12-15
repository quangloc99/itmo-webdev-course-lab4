import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingAreaPicComponent } from './checking-area-pic.component';

describe('CheckingAreaPicComponent', () => {
  let component: CheckingAreaPicComponent;
  let fixture: ComponentFixture<CheckingAreaPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckingAreaPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingAreaPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
