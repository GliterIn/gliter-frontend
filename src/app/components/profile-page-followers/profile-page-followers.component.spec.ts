import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageFollowersComponent } from './profile-page-followers.component';

describe('ProfilePageFollowersComponent', () => {
  let component: ProfilePageFollowersComponent;
  let fixture: ComponentFixture<ProfilePageFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageFollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
