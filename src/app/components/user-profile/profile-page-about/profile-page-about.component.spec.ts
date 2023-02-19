import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { ProfilePageAboutComponent } from './profile-page-about.component';

describe('ProfilePageAboutComponent', () => {
  let component: ProfilePageAboutComponent;
  let fixture: ComponentFixture<ProfilePageAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageAboutComponent ],
      providers: [{
        provide: AuthenticationService,
        useClass: MockAuthenticationService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
