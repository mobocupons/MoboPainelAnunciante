import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderInformationComponent } from './card-header-information.component';

describe('HeaderInformationComponent', () => {
  let component: CardHeaderInformationComponent;
  let fixture: ComponentFixture<CardHeaderInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardHeaderInformationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHeaderInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
