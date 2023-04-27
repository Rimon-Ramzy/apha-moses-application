import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HymnsComponent } from './hymns.component';

describe('HymnsComponent', () => {
  let component: HymnsComponent;
  let fixture: ComponentFixture<HymnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HymnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HymnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
