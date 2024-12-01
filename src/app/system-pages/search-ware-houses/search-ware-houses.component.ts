import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API } from 'src/app/Cors/enums/API/api';
import { Items } from 'src/app/Cors/Models/Items';
import { WareHouse } from 'src/app/Cors/Models/WareHouse';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';

@Component({
  selector: 'app-search-ware-houses',
  templateUrl: './search-ware-houses.component.html',
  styleUrls: ['./search-ware-houses.component.css']
})

export class SearchWareHousesComponent {
  wareHouses!: WareHouse[];
  items!: Items[];
  wareHouseRequest: WareHouse = new WareHouse()
  selectedWarehouse: WareHouse[] = [];
  dialogVisible: boolean = false
  constructor(private genericService: GenericServiceService, public router: Router, private messageService: MessageService) { }

  cols!: Column[];

  exportColumns!: ExportColumn[];

  ngOnInit() {

    this.ReturnWareHouses()

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  ReturnWareHouses() {
    this.wareHouseRequest.createdBy = Number(localStorage.getItem('id'))
    this.genericService.Services(this.wareHouseRequest, API.GetWarehouses).subscribe((data: WareHouse[]) => {
      if (data.length) {
        this.wareHouses = data

      }
      else this.messageService.add({ severity: 'error', detail: "No Data" })
    })
  }
  Add() {
    this.router.navigateByUrl("/Systems/ADDWareHouses")
  }
  Delete() {
    let id = ''
    this.selectedWarehouse.forEach((element, index) => {
      if (index < this.selectedWarehouse.length - 1)
        id += element.id + ','
      else
        id += element.id
    })
    this.genericService.Services(id, API.DeleteWarehouse).subscribe((data: any) => {
      this.selectedWarehouse = []
      this.ReturnWareHouses()
    })
  }
  ShowItems(warehouse: WareHouse) {
    this.genericService.Services({ wearhouseID: warehouse.id }, API.getItems).subscribe((data: Items[]) => {
      if (data.length) {
        this.items = data
        this.dialogVisible = true
      }
      else this.messageService.add({ severity: 'error', detail: "This Warehouse doesn't have Items" })
    })
  }
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