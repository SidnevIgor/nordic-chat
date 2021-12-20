import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "src/services/auth.service";
import { ThemeService } from "src/theme/theme.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
    ) { }
  theme: string;
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.themeService.theme$.subscribe((theme) => {
        this.theme = theme;
      })
    );
  }
  ngOnDestroy() {
    this.subs.forEach((sub) => sub?.unsubscribe());
  }
  logOut() {
    localStorage.removeItem("userId");
    this.authService.logout();
  }
  onThemeToggle() {
    this.themeService.toggleTheme();
  }
}
