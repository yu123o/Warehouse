import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSupplyDocumentsComponent } from './search-supply-documents.component';

describe('SearchSupplyDocumentsComponent', () => {
  let component: SearchSupplyDocumentsComponent;
  let fixture: ComponentFixture<SearchSupplyDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSupplyDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSupplyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
