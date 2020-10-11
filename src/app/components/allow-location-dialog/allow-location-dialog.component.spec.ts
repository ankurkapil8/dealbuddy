import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowLocationDialogComponent } from './allow-location-dialog.component';

describe('AllowLocationDialogComponent', () => {
  let component: AllowLocationDialogComponent;
  let fixture: ComponentFixture<AllowLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
