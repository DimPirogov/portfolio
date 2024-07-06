import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Movie } from './../../../model/movie/movie';

@Component({
  selector: 'app-moviecards',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './moviecards.component.html',
  styleUrl: './moviecards.component.css'
})
export class MoviecardsComponent {
  @Input() movieData!: Movie[];
  movie!: Movie;
}
