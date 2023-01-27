import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageGalleryComponent } from './profile-page-gallery.component';

describe('ProfilePageGalleryComponent', () => {
  let component: ProfilePageGalleryComponent;
  let fixture: ComponentFixture<ProfilePageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
