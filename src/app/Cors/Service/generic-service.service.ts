import { Injectable } from '@angular/core';
import myJson from '../../../assets/Config/config.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class GenericServiceService {

  constructor(private http: HttpClient) {

    console.log(myJson.URL)
  }
  LoginService(Obj: any, api: string): any {
    let baseURL = myJson.URL + api;
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    // const body=JSON.stringify(Obj);
    // console.log(body)
    return this.http.post(baseURL, Obj, { 'headers': headers })
  }
  Services(Obj: any, api: string): any {
    let baseURL = myJson.URL + api;
    const headers = new HttpHeaders().append('Content-Type', 'application/json').append("Authorization", "Bearer " + localStorage.getItem("JWT"));
    // const body=JSON.stringify(Obj);
    // console.log(body)
    return this.http.post(baseURL, Obj, { 'headers': headers })
  }

  Notification(Obj: string): any {
    if (Obj) {debugger
      let notification = Obj.split("$")
      console.log("notification", notification)
      switch (notification[0]) {
        case "N":
          return ["Success", "success"]
          break;
        case "U":
          return ["Success", "success"]
          break;
        case "D":
          return ["Success", "success"]
          break;
        case "all":
          return ["Success", "success"]
          break;
          case "E":
          return ["Error", notification[1]]
          break;
        default:
          return ["Failed","error"]
          break;
      }
    }
  }
}
