import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInfoDialogComponent } from './item-info-dialog.component';

describe('ItemInfoDialogComponent', () => {
  let component: ItemInfoDialogComponent;
  let fixture: ComponentFixture<ItemInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
