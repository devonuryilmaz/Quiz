import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek8Component } from './video-upload-gaze-secenek8.component';

describe('VideoUploadGazeSecenek8Component', () => {
  let component: VideoUploadGazeSecenek8Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
