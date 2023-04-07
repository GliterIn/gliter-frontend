import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingComponent } from './onboarding.component';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MockAuthenticationService } from 'src/app/MockServices/MockAuth';

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse url correctly', () => {
    expect(component.is_valid_url('www.google.com')).toBeTruthy();
  })

  it('should not parse url correctly', () => {
    expect(component.is_valid_url('www com')).toBeFalsy();
  })

  it('should validate correct string', () => {
    expect(component.is_valid_length("foobar","test",3,10)).toBeTruthy();
  })

  it('should not validate correct string', () => {
    expect(component.is_valid_length("foobarfoobar","test",3,10)).toBeFalsy();
  })
  
  it('should validate non empty string', () => {
    expect(component.is_empty_string("foobarfoobar","test")).toBeFalsy();
  })

  it('should not validate empty string', () => {
    expect(component.is_empty_string("","test")).toBeTruthy();
  })

  it('should match a valid URL', () => {
    const validUrl = 'https://www.example.com/path/to/page.html';
    expect(component.url_regex.test(validUrl)).toBe(true);
  });

  it('should not match an invalid URL', () => {
    const invalidUrl = 'ftp://www.example.com/path/to/page.html';
    expect(component.url_regex.test(invalidUrl)).toBe(false);
  });

  it('should match a URL without a path', () => {
    const urlWithoutPath = 'https://www.example.com';
    expect(component.url_regex.test(urlWithoutPath)).toBe(true);
  });

  it('should match a URL with a query string', () => {
    const urlWithQueryString = 'https://www.example.com/?query=string';
    expect(component.url_regex.test(urlWithQueryString)).toBe(true);
  });


});
