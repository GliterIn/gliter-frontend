import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      providers:[
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
