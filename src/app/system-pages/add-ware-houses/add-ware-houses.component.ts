import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API } from 'src/app/Cors/enums/API/api';
import { Items } from 'src/app/Cors/Models/Items';
import { WareHouse } from 'src/app/Cors/Models/WareHouse';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';

@Component({
  selector: 'app-add-ware-houses',
  templateUrl: './add-ware-houses.component.html',
  styleUrls: ['./add-ware-houses.component.css']
})
export class AddWareHousesComponent {
  formGroup: FormGroup = new FormGroup({})
  addWarehouse: WareHouse = new WareHouse()
  wareHouseRequest: WareHouse = new WareHouse()
  wareHouses!: WareHouse[];


  itemDialog: boolean = false;

  items: Items[] = [];

  item!: Items;

  selectedItems!: Items[] | null;

  submitted: boolean = false;

  statuses!: any[];
  constructor(public service: GenericServiceService, public router: Router, private messageService: MessageService) {
  }
  ngOnInit() {
    this.initFormGroup()
  }
  initFormGroup() {
    this.formGroup = new FormGroup({
      Name: new FormControl(this.addWarehouse.name, [Validators.required]),
      Description: new FormControl(this.addWarehouse.description, [Validators.required])
    })
  }
  ReturnWareHouses() {
    this.wareHouseRequest.name = this.addWarehouse.name
    return this.service.Services(this.wareHouseRequest, API.GetWarehouses)
  }
  Save() {
    this.ReturnWareHouses().subscribe((data: WareHouse[]) => {
      if (data.length) {

        let obj = this.service.Notification("E$This warehouse name is already exist")
        this.messageService.add({ severity: obj[0], detail: obj[1] })
      }
      else {
        this.addWarehouse.createdBy = Number(localStorage.getItem("id"))
        this.service.Services(this.addWarehouse, API.AddWarehouse).subscribe((data: any) => {
          console.log(data)
          this.items.forEach(item => {
            item.wearhouseID = data.id
            this.AddItems(item)
          })
          this.router.navigateByUrl("/Systems/WareHouses")
        })
      }
      // else this.messageService.add({ severity: 'error', detail: "LoginFailed" })
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
