import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemModalComponent } from './poem-modal.component';

describe('PoemModalComponent', () => {
  let component: PoemModalComponent;
  let fixture: ComponentFixture<PoemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
