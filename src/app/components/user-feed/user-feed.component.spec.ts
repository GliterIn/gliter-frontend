import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/MockServices/MockActivatedRoute';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { MockDatabaseService } from 'src/app/MockServices/MockDatabase';
import { MockUtilService } from 'src/app/MockServices/MockUtils';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

import { UserFeedComponent } from './user-feed.component';

describe('UserFeedComponent', () => {
  let component: UserFeedComponent;
  let fixture: ComponentFixture<UserFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFeedComponent ],
      providers: [
        {
          provide: DatabaseService,
          useClass: MockDatabaseService
        },
        {
          provide: UtilsService,
          useClass: MockUtilService
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
