import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek7Component } from './video-upload-gaze-secenek7.component';

describe('VideoUploadGazeSecenek7Component', () => {
  let component: VideoUploadGazeSecenek7Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
