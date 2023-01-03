import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { BeRightBackComponent } from './be-right-back.component';

describe('BeRightBackComponent', () => {
  let component: BeRightBackComponent;
  let fixture: ComponentFixture<BeRightBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeRightBackComponent],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BeRightBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
