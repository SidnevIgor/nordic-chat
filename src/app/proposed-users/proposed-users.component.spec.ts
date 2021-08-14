import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedUsersComponent } from './proposed-users.component';

describe('ProposedUsersComponent', () => {
  let component: ProposedUsersComponent;
  let fixture: ComponentFixture<ProposedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
