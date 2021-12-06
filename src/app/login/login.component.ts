import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service'
import { User } from '../../interfaces/User'; 
import { Subscription } from 'rxjs';

//form elements
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, EmailValidator } from '@angular/forms';
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
export class LoginComponent implements OnInit {
  formMode: string = "signin";
  contactId: string;
  $invitor: Subscription;
  get togglerDesc(): string {
    return this.formMode === "signin" ? "I already have an account" : "I want to create an account"; 
  }
  loginForm = new FormGroup({});
  submitErrorMessage: string;
  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, 
              private router: Router, 
              private route: ActivatedRoute,
              private userService: UserService,
              private chatService: ChatService) {
    this.route.queryParams.subscribe(params => {
      this.contactId = params['invitedBy'];
    });
  }
  ngOnInit() {
    this.setFormControls();
  }
  setFormControls(): void {
    this.loginForm.registerControl("clientName", new FormControl('', [
      Validators.required
    ]));
    this.loginForm.registerControl("email", new FormControl('', [
      Validators.required,
      Validators.email
    ]));
    this.loginForm.registerControl("password", new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]));
  }
  onToggleChange(): void {
    this.toggleControls();
    this.formMode = this.formMode === "signin" ? "signup" : "signin";
  }
  toggleControls(): void {
    this.formMode === "signin" ? 
    this.loginForm.registerControl("clientName", new FormControl('', [
      Validators.required
    ])) :
    this.loginForm.removeControl("clientName");
  }
  async googleAuth() {
    let { user } = await this.authService.loginWithEmail();
    if(user) {
      localStorage.setItem('userId', user.uid);
      if(this.contactId) {
        this.userService.saveWithContact(user, [this.contactId]).then(() => {
          this.$invitor = this.userService.get(this.contactId).valueChanges().subscribe((invitor: User) => {
            if(invitor.contacts) {
              invitor.contacts.push(user.uid);
              this.$invitor.unsubscribe();
            }
            else {
              invitor.contacts = [user.uid];
              this.$invitor.unsubscribe();
            }
            this.userService.saveWithContact(invitor, invitor.contacts).then(() => {
              let invited: any = {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                contacts: [this.contactId]
              };
              this.chatService.addChat(invited, invitor).then(() => {
                this.router.navigate(['/']);
              });
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
  async signIn() {
    let { email, password } = this.loginForm.value;
    try {
      let { user } = await this.authService.loginWithEmailAndPass(email, password);
      this.userService.save(user).then(() => {
        this.router.navigate(['/']);
    });
    }
    catch(err) {
      this.submitErrorMessage = err.code;
    }
  }
  async signUp() {
    let { clientName, email, password } = this.loginForm.value;
    try {
      this.authService.signUpWithEmailAndPass(email, password).then((userCreated) => {
        localStorage.setItem('userId', userCreated.user.uid);
          let { user } = userCreated;
          user.displayName = clientName;
          this.userService.save(user).then(() => {
            this.router.navigate(['/']);
          })
      })
      //let { user } = await this.authService.loginWithEmailAndPass(email, password);
     // user.displayName = clientName;
     // await this.userService.save(user);
      this.router.navigate(['/']); 
    }
    catch(err) {
      this.submitErrorMessage = err.code;
    }
  }
}
