import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWareHousesComponent } from './add-ware-houses.component';

describe('AddWareHousesComponent', () => {
  let component: AddWareHousesComponent;
  let fixture: ComponentFixture<AddWareHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWareHousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWareHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
