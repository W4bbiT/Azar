import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOneCartComponent } from './get-one-cart.component';

describe('GetOneCartComponent', () => {
  let component: GetOneCartComponent;
  let fixture: ComponentFixture<GetOneCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOneCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetOneCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
