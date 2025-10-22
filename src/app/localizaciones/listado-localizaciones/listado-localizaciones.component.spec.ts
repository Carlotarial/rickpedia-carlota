import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLocalizacionesComponent } from './listado-localizaciones.component';

describe('ListadoLocalizacionesComponent', () => {
  let component: ListadoLocalizacionesComponent;
  let fixture: ComponentFixture<ListadoLocalizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoLocalizacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoLocalizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
