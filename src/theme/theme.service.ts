import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme$: BehaviorSubject<string> = new BehaviorSubject("dark");
  getTheme(): string {
    return localStorage.getItem("theme");
  }
  setTheme(theme: string): void {
    this.theme$.next(theme);
    localStorage.setItem("theme", theme);
  }
  toggleTheme() {
    let newTheme = this.getTheme() == "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  }
}