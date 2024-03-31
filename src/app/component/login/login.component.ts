import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormBuilder, UntypedFormGroup,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {HotToastService} from "@ngneat/hot-toast";
import {ToastrService} from "ngx-toastr";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup

  constructor(
    private fb: UntypedFormBuilder,
    private authService:AuthenticationService,
    private toasterService:ToastrService,
    public characterService:CharacterService) {
  }
  ngOnInit(): void {
    this.buildForm()
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  buildForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submit() {
    const { email, password } = this.loginForm.value;
    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    this.characterService
      .auth(email, password)
      .subscribe( {
        next:(response)=>{
          console.log(response)
          if(response) {
            this.toasterService.success('Login success.')
            this.characterService.routePage('/home')
          }
        }
      });
  }
}

