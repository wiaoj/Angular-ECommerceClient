import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingComplateDialogComponent } from './shopping-complate-dialog.component';

describe('ShoppingComplateDialogComponent', () => {
  let component: ShoppingComplateDialogComponent;
  let fixture: ComponentFixture<ShoppingComplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingComplateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingComplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
