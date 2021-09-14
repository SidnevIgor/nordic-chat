import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User'; 
import { Subscription } from 'rxjs';

//form elements
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
              private userService: UserService) {
    
    this.route.queryParams.subscribe(params => {
      this.contactId = params['invitedBy'];
    });
  }
  contactId: string;
  $invitor: Subscription;

  //form elements
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
      if(this.contactId) {
        this.userService.saveWithContact(user, [this.contactId]).then(() => {
          this.$invitor = this.userService.get(this.contactId).valueChanges().subscribe((invitor) => {
            if(invitor.contacts) {
              invitor.contacts.push(user.uid);
              this.$invitor.unsubscribe();
            }
            else {
              invitor.contacts = [user.uid];
              this.$invitor.unsubscribe();
            }
            this.userService.saveWithContact(invitor, invitor.contacts).then(() => {
              this.router.navigate(['/']);
            });
          });
        })
      }
      else {
        this.userService.save(user).then(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
