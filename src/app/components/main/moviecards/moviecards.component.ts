import { Movie } from './../../../model/movie/movie';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
