import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOneUserComponent } from './get-one-user.component';

describe('GetOneUserComponent', () => {
  let component: GetOneUserComponent;
  let fixture: ComponentFixture<GetOneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOneUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
