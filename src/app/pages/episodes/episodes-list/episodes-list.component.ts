import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EpisodesService } from '../../../core/services/episodes.service';
import { Episode } from '../../../core/models/episode.model';
import { ApiResponse } from '../../../core/models/api-response.model';
import {
  Observable,
  BehaviorSubject,
  combineLatest,
  startWith,
  switchMap,
  tap,
  finalize,
} from 'rxjs';

@Component({
  selector: 'app-episodes-list',
  standalone: false,
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
})
export class EpisodesListComponent implements OnInit {
  episodes$!: Observable<ApiResponse<Episode> | null>;
  isLoading = false;
  currentPage = 1;

  searchForm!: FormGroup;

  private page$ = new BehaviorSubject<number>(1);

  constructor(private fb: FormBuilder, private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      name: [''],
    });

    const search$ = this.searchForm.valueChanges.pipe(
      startWith(this.searchForm.value),
      tap(() => {
        this.currentPage = 1;
        this.page$.next(1);
      })
    );

    this.episodes$ = combineLatest([search$, this.page$]).pipe(
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(([form, page]) =>
        this.episodesService.getEpisodes(page, form['name'] || undefined).pipe(
          tap(() => {
            this.currentPage = page;
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
      )
    );
  }

  onPageChange(next: boolean): void {
    const newPage = this.currentPage + (next ? 1 : -1);

    if (newPage < 1) {
      return;
    }

    this.currentPage = newPage;
    this.page$.next(this.currentPage);
  }
}
