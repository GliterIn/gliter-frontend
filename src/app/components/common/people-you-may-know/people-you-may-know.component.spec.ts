import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleYouMayKnowComponent } from './people-you-may-know.component';

describe('PeopleYouMayKnowComponent', () => {
  let component: PeopleYouMayKnowComponent;
  let fixture: ComponentFixture<PeopleYouMayKnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleYouMayKnowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleYouMayKnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
