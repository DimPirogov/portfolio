import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { ThemeService } from '../../src/app/service/theme/theme.service';
import { Theme } from './model/theme/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';

  constructor(public themeService: ThemeService) {
    this.loadThemeFromStorage();
  }

  private loadThemeFromStorage(): void {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      this.themeService.setTheme(storedTheme);
    } else {
      const defaultTheme = Theme.Light;
      this.themeService.setTheme(defaultTheme);
    }
  }

}
