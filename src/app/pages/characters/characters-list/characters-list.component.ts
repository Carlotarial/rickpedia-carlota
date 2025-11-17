import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharactersService } from '../../../core/services/characters.service';
import { Character } from '../../../core/models/character.model';
import { ApiResponse } from '../../../core/models/api-response.model';
import {
  Observable,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import {
  startWith,
  switchMap,
  tap,
  finalize,
} from 'rxjs/operators';

@Component({
  selector: 'app-characters-list',
  standalone: false,
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  characters$!: Observable<ApiResponse<Character> | null>;
  isLoading = false;
  currentPage = 1;

  filtersForm!: FormGroup;

  // Filtros cerrados por defecto
  showFilters = false;

  private page$ = new BehaviorSubject<number>(1);

  constructor(
    private fb: FormBuilder,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      name: [''],
      status: [''],
      species: [''],
    });

    const filters$ = this.filtersForm.valueChanges.pipe(
      startWith(this.filtersForm.value),
      tap(() => {
        // Cuando cambian filtros, volvemos a la página 1
        this.currentPage = 1;
        this.page$.next(1);
      })
    );

    this.characters$ = combineLatest([filters$, this.page$]).pipe(
      tap(() => (this.isLoading = true)),
      switchMap(([filters, page]) =>
        this.charactersService
          .getCharacters(
            page,
            filters['name'] || undefined,
            filters['status'] || undefined,
            filters['species'] || undefined
          )
          .pipe(
            tap(() => (this.currentPage = page)),
            finalize(() => (this.isLoading = false))
          )
      )
    );
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onPageChange(next: boolean): void {
    const newPage = this.currentPage + (next ? 1 : -1);
    if (newPage < 1) return;

    this.currentPage = newPage;
    this.page$.next(newPage);
  }

  // 👇 Botón "Limpiar filtros"
  clearFilters(): void {
    this.filtersForm.reset({
      name: '',
      status: '',
      species: '',
    });
    // No hace falta tocar la paginación aquí, el tap() de filters$
    // ya pone la página a 1 cuando cambian los filtros.
  }
}
