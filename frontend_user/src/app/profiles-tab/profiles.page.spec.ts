import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profilesPage } from './profiles.page';

describe('profilesPage', () => {
  let component: profilesPage;
  let fixture: ComponentFixture<profilesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(profilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
