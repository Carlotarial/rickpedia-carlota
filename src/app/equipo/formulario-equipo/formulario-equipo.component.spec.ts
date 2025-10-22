import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEquipoComponent } from './formulario-equipo.component';

describe('FormularioEquipoComponent', () => {
  let component: FormularioEquipoComponent;
  let fixture: ComponentFixture<FormularioEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
