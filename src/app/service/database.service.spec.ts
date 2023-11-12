import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/internal/Observable';
import { MockAuthenticationService } from '../MockServices/MockAuth';
import { Post } from '../models/Post.model';
import { AuthenticationService } from './authentication.service';

import { DatabaseService } from './database.service';

class MockHttp{
  get(): Observable<Post[]>{
    return new Observable<Post[]>();
  }
}
describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService
        },
        {
          provide: HttpClient,
          useClass: MockHttp
        }
      ]
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('has backend api not set to localhost', ()=>{
    expect(service.API_BASE_URL).toEqual('https://gliter-backend.siddharth27.repl.co/api');
  })
});
