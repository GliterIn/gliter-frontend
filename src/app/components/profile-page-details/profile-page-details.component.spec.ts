import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageDetailsComponent } from './profile-page-details.component';

describe('ProfilePageDetailsComponent', () => {
  let component: ProfilePageDetailsComponent;
  let fixture: ComponentFixture<ProfilePageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
