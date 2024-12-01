import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { SearchWareHousesComponent } from '../system-pages/search-ware-houses/search-ware-houses.component';
import { AuthGuardServiceService } from '../Cors/Service/auth-guard-service.service';
import { TableModule } from 'primeng/table';
import { AddWareHousesComponent } from '../system-pages/add-ware-houses/add-ware-houses.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddSupplyDocumentsComponent } from '../system-pages/add-supply-documents/add-supply-documents.component';
import { SearchSupplyDocumentsComponent } from '../system-pages/search-supply-documents/search-supply-documents.component';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
  {
    path: "", component: ContentComponent,
    children: [
      {
        path: "WareHouses", component: SearchWareHousesComponent,
        canActivate: [AuthGuardServiceService]
      },
      {
        path: "ADDWareHouses", component: AddWareHousesComponent,
        canActivate: [AuthGuardServiceService]
      },
      {
        path: "ViewWareHouses:/ID", component: AddWareHousesComponent,
        canActivate: [AuthGuardServiceService]
      },
      {
        path: "SupplyDocuments", component: SearchSupplyDocumentsComponent,
        canActivate: [AuthGuardServiceService]
      },
      {
        path: "ADDSupplyDocument", component: AddSupplyDocumentsComponent,
        canActivate: [AuthGuardServiceService]
      },
      {
        path: "ViewSupplyDocuments:/ID", component: AddSupplyDocumentsComponent,
        canActivate: [AuthGuardServiceService]
      }

    ],

  },

]

@NgModule({
  declarations: [
    ContentComponent,
    SearchWareHousesComponent,
    AddWareHousesComponent,
    AddSupplyDocumentsComponent,
    SearchSupplyDocumentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MenubarModule,
    ButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ToolbarModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule
  ],
  exports: [
    RouterModule,
    ContentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule { }
