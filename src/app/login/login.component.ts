import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service' 
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, 
              private router: Router, 
              private route: ActivatedRoute,
              private userService: UserService,) { 
    let userId = localStorage.getItem("userId");

  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  matcher = new MyErrorStateMatcher();

  async signIn() {
    let { user } = await this.authService.loginWithEmail();
    if(user) {
      localStorage.setItem('userId', user.uid);
      this.userService.save(user).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
