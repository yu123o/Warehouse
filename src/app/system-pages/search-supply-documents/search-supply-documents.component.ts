import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API } from 'src/app/Cors/enums/API/api';
import { SupplyDocuments } from 'src/app/Cors/Models/SupplyDocuments';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';

@Component({
  selector: 'app-search-supply-documents',
  templateUrl: './search-supply-documents.component.html',
  styleUrls: ['./search-supply-documents.component.css']
})
export class SearchSupplyDocumentsComponent {
  userType = localStorage.getItem("userType")
  supplyDocuments!: SupplyDocuments[];
  supplyDocumentsRequest: SupplyDocuments = new SupplyDocuments()
  selectedSupplyDocuments!: SupplyDocuments[];
  constructor(private genericService: GenericServiceService, public router: Router, private messageService: MessageService) { }

  cols!: Column[];

  exportColumns!: ExportColumn[];

  ngOnInit() {

    this.ReturnSupplyDocuments()

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'subject', header: 'subject' },
      { field: 'createdDateAndTime', header: 'CreatedDateAndTime' },

    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  ReturnSupplyDocuments() {
    if (localStorage.getItem('userType') == 'Employee')
      this.supplyDocumentsRequest.createdBy = Number(localStorage.getItem('id'))
    this.genericService.Services(this.supplyDocumentsRequest, API.getSupplyDocuments).subscribe((data: SupplyDocuments[]) => {
      if (data.length) {
        this.supplyDocuments = data
        const datePipe = new DatePipe('en-Us');
        this.supplyDocuments.forEach(element=>{
          element.createdDateAndTime = datePipe.transform(element.createdDateAndTime, 'dd-MM-yyyy')
        })
      }
      else this.messageService.add({ severity: 'error', detail: "No Data" })
    })
  }
  Add() {
    this.router.navigateByUrl("/Systems/ADDSupplyDocument")
  }
  Delete() {
  }
  Approve(rowData: SupplyDocuments){}
  Reject(rowData: SupplyDocuments){}
}
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}