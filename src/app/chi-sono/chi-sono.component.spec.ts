import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiSonoComponent } from './chi-sono.component';

describe('ChiSonoComponent', () => {
  let component: ChiSonoComponent;
  let fixture: ComponentFixture<ChiSonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiSonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiSonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
