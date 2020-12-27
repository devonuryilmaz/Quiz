import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek4Component } from './video-upload-gaze-secenek4.component';

describe('VideoUploadGazeSecenek4Component', () => {
  let component: VideoUploadGazeSecenek4Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
