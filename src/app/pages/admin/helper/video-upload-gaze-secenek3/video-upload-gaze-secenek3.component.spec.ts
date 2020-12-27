import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek3Component } from './video-upload-gaze-secenek3.component';

describe('VideoUploadGazeSecenek3Component', () => {
  let component: VideoUploadGazeSecenek3Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
