import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { MockDatabaseService } from 'src/app/MockServices/MockDatabase';
import { MockUtilService } from 'src/app/MockServices/MockUtils';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

import { MyProfileSidebarComponent } from './my-profile-sidebar.component';

describe('MyProfileSidebarComponent', () => {
  let component: MyProfileSidebarComponent;
  let fixture: ComponentFixture<MyProfileSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileSidebarComponent ],
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
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
