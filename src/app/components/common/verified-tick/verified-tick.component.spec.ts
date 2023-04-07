import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedTickComponent } from './verified-tick.component';

describe('VerifiedTickComponent', () => {
  let component: VerifiedTickComponent;
  let fixture: ComponentFixture<VerifiedTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedTickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
