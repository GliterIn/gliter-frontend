import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/MockServices/MockActivatedRoute';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { MockDatabaseService } from 'src/app/MockServices/MockDatabase';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';

import { ProfilePagePostsComponent } from './profile-page-posts.component';

describe('ProfilePagePostsComponent', () => {
  let component: ProfilePagePostsComponent;
  let fixture: ComponentFixture<ProfilePagePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePagePostsComponent ],
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
        }
      ]
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
