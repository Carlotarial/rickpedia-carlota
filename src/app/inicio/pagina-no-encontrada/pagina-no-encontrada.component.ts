import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-no-encontrada',
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrls: ['./pagina-no-encontrada.component.scss'],
})
export class PaginaNoEncontradaComponent {
  constructor(private router: Router) {}

  volverInicio() {
    this.router.navigate(['/']);
  }
}
