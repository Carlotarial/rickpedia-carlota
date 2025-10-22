import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLocalizacionComponent } from './detalle-localizacion.component';

describe('DetalleLocalizacionComponent', () => {
  let component: DetalleLocalizacionComponent;
  let fixture: ComponentFixture<DetalleLocalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleLocalizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleLocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
