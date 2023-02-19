import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      providers:[
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
