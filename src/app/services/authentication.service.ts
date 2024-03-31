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
   pipe(map(async response => {
     const idTokenResult = await response.user.getIdTokenResult();
     this.token = !response.user.isAnonymous ? idTokenResult.token : null;
     localStorage.setItem('token',idTokenResult.token)
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
