import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageBadgesComponent } from './profile-page-badges.component';

describe('ProfilePageBadgesComponent', () => {
  let component: ProfilePageBadgesComponent;
  let fixture: ComponentFixture<ProfilePageBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
