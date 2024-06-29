import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Theme } from '../../model/theme/theme';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>(Theme.Light);

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.currentTheme.next(storedTheme as Theme);
    }
  }

  public getTheme(): Observable<Theme> {
    return this.currentTheme.asObservable();
  }

  public toggleTheme (): void {
    const newTheme = this.currentTheme.value === Theme.Light ? Theme.Dark : Theme.Light;
    this.setTheme(newTheme);
    this.applyThemeToUI(newTheme);
  }

  public setTheme(theme: Theme): void {
    this.currentTheme.next(theme);
    localStorage.setItem('theme', theme);
    this.applyThemeToUI(theme);
  }

  private applyThemeToUI(theme: Theme): void {
    const bodyClassList = document.body.classList;
    bodyClassList.remove(Theme.Light, Theme.Dark);
    bodyClassList.add(theme);
  }
}
