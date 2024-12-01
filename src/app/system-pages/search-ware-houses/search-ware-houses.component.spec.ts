import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWareHousesComponent } from './search-ware-houses.component';

describe('SearchWareHousesComponent', () => {
  let component: SearchWareHousesComponent;
  let fixture: ComponentFixture<SearchWareHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchWareHousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchWareHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
