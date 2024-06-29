import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { MoviesService } from '../../service/movies/movies.service';
// import { ThemeService } from '../../service/theme/theme.service';
import { LoaderComponent } from '../loader/loader/loader.component';
import { MoviecardsComponent } from './moviecards/moviecards.component';
import { SwitchComponent } from '../switch/switch.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
    MoviecardsComponent,
    SwitchComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  private destroy$ = new Subject<void>();

  showLoader: boolean = false;
  searchMovies = new FormControl('');
  oldSearch: string = '';
  movieData: any = [];

  showError: boolean = false;
  errorMessage: string = '';

  constructor(
    private moviesService: MoviesService,
    // public themeService: ThemeService
  ) {}

  ngOnInit() {}

  // toggleTheme(): void {
  //   this.themeService.toggleTheme();
  // }

  searchMoviesByName() {
    if(this.searchMovies.value === '') {
      this.showError = true;
      this.errorMessage = 'Please enter a NAME to search';
      setTimeout(() => {
        this.showError = false;
      }, 5000);
      this.searchInput.nativeElement.focus();
      return;
    }
    else if(this.oldSearch === this.searchMovies.value) {
      return;
    }
    this.showLoader = true;
    this.moviesService
      .getMoviesByName(this.searchMovies.value || '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.movieData = res.d;
          if (this.movieData.length != 0) {
            console.log(this.movieData);
          }
          this.showLoader = false;
          this.oldSearch = this.searchMovies.value || '';
        },
        error: (err) => this.handleError(err)
      })
  }

  handleError(err: any): void {
    this.showLoader = false;
    console.error('An error occurred:', err);
    this.errorMessage =
      'An error occurred while processing your request. Please try again later.';
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 5000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
