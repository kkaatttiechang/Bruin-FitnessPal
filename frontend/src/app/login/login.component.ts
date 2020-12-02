import { Component, OnInit } from '@angular/core';
//connect to backend
import { AppService } from "../app.service";
import { Router } from '@angular/router';
import { NotifierService } from '../notifier.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService, private router: Router,private notifierService:NotifierService) { }


  ngOnInit() {

  }

  loginUser(event: any) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    var message: string ='';
    this.appService.getUserById(username).subscribe((user: any) => {
      console.log(user)
    
    })
    this.appService.loginUserByName(username, password).subscribe((data: any) => {

      if (data.status === "X103") {
        message = data.status
        this.appService.getUserById(username).subscribe((user: any) => {
          console.log(user.accountId)
        
        })
        this.router.navigate(['home'])

      }
      else if (data.status === "X003") {


      }

    })

    this.appService.loginUserById(username, password).subscribe((data: any) => {

      if (data.status === "X103") {
        this.appService.getUserById(username).subscribe((user: any) => {
          console.log(user.accountId)
        
        })
        this.router.navigate(['home'])
        message=data.status
        
      }
      else if (data.status === "X003") {
        if (message !== "X103") {
          this.notifierService.showNotification(data.message,'ok')
        }
      }

    })
    

  }

}
