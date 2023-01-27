import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePagePostsComponent } from './profile-page-posts.component';

describe('ProfilePagePostsComponent', () => {
  let component: ProfilePagePostsComponent;
  let fixture: ComponentFixture<ProfilePagePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePagePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePagePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
