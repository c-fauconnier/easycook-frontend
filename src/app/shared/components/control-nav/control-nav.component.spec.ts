import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlNavComponent } from './control-nav.component';

describe('ControlNavComponent', () => {
  let component: ControlNavComponent;
  let fixture: ComponentFixture<ControlNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
