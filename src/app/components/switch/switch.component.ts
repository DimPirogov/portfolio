import { Component } from '@angular/core';

import { ThemeService } from '../../service/theme/theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  private destroy$ = new Subject<void>();
  isChecked: boolean = false;

  constructor(
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.getTheme()
    .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        this.isChecked = (theme as string) !== 'light-theme';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
