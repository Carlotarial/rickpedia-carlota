import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationsService } from '../../../core/services/locations.service';
import { Location } from '../../../core/models/location.model';
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
  selector: 'app-locations-list',
  standalone: false,
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent implements OnInit {
  locations$!: Observable<ApiResponse<Location> | null>;
  isLoading = false;
  currentPage = 1;

  searchForm!: FormGroup;

  private page$ = new BehaviorSubject<number>(1);

  constructor(private fb: FormBuilder, private locationsService: LocationsService) {}

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

    this.locations$ = combineLatest([search$, this.page$]).pipe(
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(([form, page]) =>
        this.locationsService.getLocations(page, form['name'] || undefined).pipe(
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
