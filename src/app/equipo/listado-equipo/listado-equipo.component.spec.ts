import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEquipoComponent } from './listado-equipo.component';

describe('ListadoEquipoComponent', () => {
  let component: ListadoEquipoComponent;
  let fixture: ComponentFixture<ListadoEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
