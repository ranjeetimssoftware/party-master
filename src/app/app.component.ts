import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'party-master';
  loggedIn:boolean=false;

  loginForm!:FormGroup;
  constructor(private fb: FormBuilder,private http: HttpClient){
    const token = localStorage.getItem('TOKEN');
    if(token) this.loggedIn = true;

  }
  ngOnInit(){
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required], 
    });
  }

  submit(){
    this.login()
                .pipe(first())
                .subscribe(
                    data => {
                        console.log('reach',data);
                this.loggedIn = true;
             
                    },
                    error => {
                        console.log('reach1',error); 
                    });
  }

  login(){
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    return this.http.post<any>(`http://localhost:804/api/jwt`, { username, password })
            .pipe(map((user:any) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('USER_PROFILE', JSON.stringify(user.profile));
                localStorage.setItem('setting', JSON.stringify(user.setting));
                sessionStorage.setItem('USER_PROFILE', JSON.stringify(user.profile));
                localStorage.setItem('TOKEN', JSON.stringify(user.token));
                localStorage.setItem('port', JSON.stringify(user.ports));
                return user;
            }));
  }
}
