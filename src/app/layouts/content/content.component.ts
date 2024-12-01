import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ContentComponent {
  userType = localStorage.getItem("userType")
  hide: boolean = true
  constructor( public router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
   
  }

  ngOnInit() {

  }
 
  LogOut() {
    
    this.confirmationService.confirm({
      message: 'Logout',
      header: 'Are you sure ?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      rejectVisible: false,
      accept: () => {
        this.router.navigateByUrl("")
        localStorage.clear()

        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: (type: any) => {

      }
    });

  }
}
