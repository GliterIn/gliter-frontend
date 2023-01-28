import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/MockServices/MockActivatedRoute';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { MockDatabaseService } from 'src/app/MockServices/MockDatabase';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        },
        {
          provide: DatabaseService,
          useClass: MockDatabaseService
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
