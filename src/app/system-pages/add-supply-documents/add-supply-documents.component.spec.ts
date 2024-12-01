import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplyDocumentsComponent } from './add-supply-documents.component';

describe('AddSupplyDocumentsComponent', () => {
  let component: AddSupplyDocumentsComponent;
  let fixture: ComponentFixture<AddSupplyDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplyDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
