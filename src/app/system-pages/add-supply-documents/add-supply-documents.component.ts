import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { API } from 'src/app/Cors/enums/API/api';
import { Items } from 'src/app/Cors/Models/Items';
import { SupplyDocuments } from 'src/app/Cors/Models/SupplyDocuments';
import { WareHouse } from 'src/app/Cors/Models/WareHouse';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';

@Component({
  selector: 'app-add-supply-documents',
  templateUrl: './add-supply-documents.component.html',
  styleUrls: ['./add-supply-documents.component.css']
})
export class AddSupplyDocumentsComponent {
  formGroup: FormGroup = new FormGroup({})
  addSupplyDocument: SupplyDocuments = new SupplyDocuments()
  SupplyDocumentRequest: SupplyDocuments = new SupplyDocuments()
  SupplyDocuments!: SupplyDocuments[];
  selectedWarehouse: WareHouse
  Warehouses: WareHouse[] = []
  itemDialog: boolean = false;

  items: Items[] = [];

  item: Items = new Items();

  selectedItems: Items

  submitted: boolean = false;

  statuses!: any[];
  constructor(private genericService: GenericServiceService, public service: GenericServiceService, public router: Router, private messageService: MessageService) {
  }
  ngOnInit() {
    this.initFormGroup()
    this.ReturnWarehouses()
  }
  initFormGroup() {
    this.formGroup = new FormGroup({
      Name: new FormControl(this.addSupplyDocument.name, [Validators.required]),
      Subject: new FormControl(this.addSupplyDocument.subject, [Validators.required]),
      ItemId: new FormControl( [Validators.required]),
      Warehouse: new FormControl([Validators.required])
    })
  }
  ReturnSupplyDocuments() {
    this.SupplyDocumentRequest.name = this.addSupplyDocument.name
    return this.service.Services(this.SupplyDocumentRequest, API.getSupplyDocuments)
  }
  ReturnWarehouses() {
    this.genericService.Services({}, API.GetWarehouses).subscribe((data: WareHouse[]) => {
      this.Warehouses = data
    })
  }
  ReturnItems(event: any) {
    console.log(event)
    this.item.wearhouseID = event.value.id
    this.genericService.Services(this.item, API.getItems).subscribe((data: Items[]) => {
      this.items = data
    })
  }
  Save() {
    this.addSupplyDocument.itemId = this.selectedItems.id
    this.addSupplyDocument.createdBy = Number(localStorage.getItem("id"))
    this.service.Services(this.addSupplyDocument, API.addSupplyDocument).subscribe((data: any) => {
      console.log(data)
      this.items.forEach(item => {
        item.wearhouseID = data.id
        this.AddItems(item)
      })
      this.router.navigateByUrl("/Systems/SupplyDocuments")
    })



  }
  AddItems(item: Items) {
    this.service.Services(item, API.CreateItem).subscribe((data: any) => {
      console.log(data)
    })
  }
  hideDialog() {
    this.itemDialog = false;
    this.submitted = false;
  }
  saveItem() {
    this.submitted = true;

    if (this.item.name?.trim()) {
      if (this.item.id) {
        this.items[this.findIndexById(this.item.id)] = this.item;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.item.id = this.createId();
        this.items.push(this.item);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.items = [...this.items];
      this.itemDialog = false;
      this.item = new Items();
    }
  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  openNew() {
    this.item = new Items;
    this.submitted = false;
    this.itemDialog = true;
  }
  createId(): number {
    let id = 0;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += id;
    }
    return id;
  }
}
