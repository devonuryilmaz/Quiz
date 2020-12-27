import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDenemeComponent } from './chat-deneme.component';

describe('ChatDenemeComponent', () => {
  let component: ChatDenemeComponent;
  let fixture: ComponentFixture<ChatDenemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDenemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDenemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
