import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageFollowRequestsComponent } from './profile-page-follow-requests.component';

describe('ProfilePageFollowRequestsComponent', () => {
  let component: ProfilePageFollowRequestsComponent;
  let fixture: ComponentFixture<ProfilePageFollowRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageFollowRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageFollowRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
