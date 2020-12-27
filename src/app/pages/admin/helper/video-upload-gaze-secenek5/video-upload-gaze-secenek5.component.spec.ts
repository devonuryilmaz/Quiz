import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek5Component } from './video-upload-gaze-secenek5.component';

describe('VideoUploadGazeSecenek5Component', () => {
  let component: VideoUploadGazeSecenek5Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
