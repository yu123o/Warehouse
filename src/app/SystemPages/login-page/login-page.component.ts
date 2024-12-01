import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API } from 'src/app/Cors/enums/API/api';
import { LoginRequest, LoginResponse } from 'src/app/Cors/Models/login';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService]
})
export class LoginPageComponent {
  login: LoginRequest = new LoginRequest()
  formGroup: FormGroup = new FormGroup({})

  constructor(public service: GenericServiceService, public router: Router, private messageService: MessageService) {
  }
  ngOnInit() {
    this.initFormGroup()
  }

  initFormGroup() {
    this.formGroup = new FormGroup({
      UserName: new FormControl(this.login.username, [Validators.required]),
      Password: new FormControl(this.login.password, [Validators.required])
    })
  }
  async Login() {
    try {
      let data = await this.service.LoginService("", API.LogIn + "?username=" + this.login.username + "&password=" + this.login.password).subscribe((data: LoginResponse) => {
        if (data) {

          // localStorage.setItem("JWT", data.JWT)
          localStorage.setItem("fullName", data.fullName)
          localStorage.setItem("userType", data.userType)
          localStorage.setItem("id", data.id?.toString())
          if(data.userType == 'Manager')
          this.router.navigateByUrl("/Systems/WareHouses")
          else if(data.userType == 'Employee')
            this.router.navigateByUrl("/Systems/SupplyDocuments")
        }
        else{
           this.messageService.add({ severity: 'error', detail: "Wrong Username or Password" })
          }
      })
      
    }
    catch (Exception) {
      
      let obj = this.service.Notification("E$Login failed")
      this.messageService.add({ severity: obj[0], detail: obj[1] })
    }


  }
 
  
}
