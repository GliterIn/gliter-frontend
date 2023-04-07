import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { MockDatabaseService } from 'src/app/MockServices/MockDatabase';
import { MockUtilService } from 'src/app/MockServices/MockUtils';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
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

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for users and return 1', () => {
    component.search_query = 'test';
    component.search_users();
    expect(component.search_results.length).toEqual(1);
    expect(component.search_results[0].email).toEqual('john.doe@example.com');
    expect(component.search_query).toEqual('');
  });

  it('should search for users and return 0', () => {
    component.search_query = 'no_result';
    component.search_users();
    expect(component.search_results.length).toEqual(0);
    expect(component.search_query).toEqual('');
  });

});
