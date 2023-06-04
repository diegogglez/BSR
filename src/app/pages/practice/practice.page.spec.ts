import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticePage } from './practice.page';

describe('PracticePage', () => {
  let component: PracticePage;
  let fixture: ComponentFixture<PracticePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PracticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
