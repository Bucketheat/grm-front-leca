import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAltaComponent } from './citas-alta.component';

describe('CitasAltaComponent', () => {
  let component: CitasAltaComponent;
  let fixture: ComponentFixture<CitasAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasAltaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
