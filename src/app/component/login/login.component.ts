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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authService:AuthenticationService,
    private toasterService:ToastrService) {
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

  get authenticated():boolean {
    return this.authService.token !== null
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

    this.authService
      .login(email, +password)
      .pipe()
      .subscribe(() => {
       if(localStorage.getItem('token')){
         this.toasterService.success('Login success.')
         this.router.navigate(['/home'])
       }
      });
  }
}

