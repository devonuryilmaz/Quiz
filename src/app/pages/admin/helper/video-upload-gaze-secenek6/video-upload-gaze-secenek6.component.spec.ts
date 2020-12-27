import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadGazeSecenek6Component } from './video-upload-gaze-secenek6.component';

describe('VideoUploadGazeSecenek6Component', () => {
  let component: VideoUploadGazeSecenek6Component;
  let fixture: ComponentFixture<VideoUploadGazeSecenek6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadGazeSecenek6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadGazeSecenek6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
