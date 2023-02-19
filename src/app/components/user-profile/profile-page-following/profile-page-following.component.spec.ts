import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockDatabaseService } from 'src/app/MockServices/MockDatabase';
import { DatabaseService } from 'src/app/service/database.service';

import { ProfilePageFollowingComponent } from './profile-page-following.component';

describe('ProfilePageFollowingComponent', () => {
  let component: ProfilePageFollowingComponent;
  let fixture: ComponentFixture<ProfilePageFollowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageFollowingComponent ],
      providers: [
        {
          provide: DatabaseService,
          useClass: MockDatabaseService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
