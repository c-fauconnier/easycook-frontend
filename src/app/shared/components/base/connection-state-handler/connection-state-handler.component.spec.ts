import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionStateHandlerComponent } from './connection-state-handler.component';

describe('ConnectionStateHandlerComponent', () => {
  let component: ConnectionStateHandlerComponent;
  let fixture: ComponentFixture<ConnectionStateHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionStateHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionStateHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
