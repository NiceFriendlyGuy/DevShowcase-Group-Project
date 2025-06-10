import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProfilePage } from './detail-profile.page';

describe('DetailProfilePage', () => {
  let component: DetailProfilePage;
  let fixture: ComponentFixture<DetailProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
