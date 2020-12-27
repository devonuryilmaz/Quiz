import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek1Component } from './video-upload-gaze-secenek1.component';

describe('VideoUploadGazeSecenek1Component', () => {
  let component: VideoUploadGazeSecenek1Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
