import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasConsultaComponent } from './citas-consulta.component';

describe('CitasConsultaComponent', () => {
  let component: CitasConsultaComponent;
  let fixture: ComponentFixture<CitasConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
