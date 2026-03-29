import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bdcus2Component } from './bdcus-2.component';

describe('Bdcus2Component', () => {
  let component: Bdcus2Component;
  let fixture: ComponentFixture<Bdcus2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bdcus2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Bdcus2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
