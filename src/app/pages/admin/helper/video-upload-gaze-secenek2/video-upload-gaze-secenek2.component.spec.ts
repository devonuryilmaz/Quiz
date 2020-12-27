import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek2Component } from './video-upload-gaze-secenek2.component';

describe('VideoUploadGazeSecenek2Component', () => {
  let component: VideoUploadGazeSecenek2Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
