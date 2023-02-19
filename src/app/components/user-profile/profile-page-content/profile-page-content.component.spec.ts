import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageContentComponent } from './profile-page-content.component';

describe('ProfilePageContentComponent', () => {
  let component: ProfilePageContentComponent;
  let fixture: ComponentFixture<ProfilePageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
