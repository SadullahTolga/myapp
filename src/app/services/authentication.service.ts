import { Injectable } from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {catchError, EMPTY, from, map, Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);
  token:any
  constructor(private auth:Auth,private toasterService:ToastrService) { }
  login(userName:any,password:any):Observable<any>{
   return  from(signInWithEmailAndPassword(this.auth,userName,password)).
   pipe(map( response => {
     const idTokenResult =  response.user.getIdTokenResult();
     this.token = !response.user.isAnonymous ? idTokenResult.then(function(val)  {
       localStorage.setItem('token',val.token)
       console.log(val)
       return !!val.token
     }) : null
     return !!this.token
    }),catchError((err, caught) => {
      this.toasterService.error('Invalid mail or password!')
       return EMPTY;
     })
   )
  }

  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
  logout(){
    return from(this.auth.signOut())
  }
}
