import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { MockAngularFireAuth } from '../MockServices/MockAngularFireAuth';

import { AuthenticationService } from './authentication.service';

class MockHttp{
  get(): Observable<any>{
    return new Observable<any>();
  }
}
describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttp
        },
        {
          provide: AngularFireAuth,
          useClass: MockAngularFireAuth,
        }
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('has backend api not set to localhost', ()=>{
    expect(service.API_BASE_URL).toEqual('https://gliter-backend.herokuapp.com/api');
  })
});
