import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadCustomComponent } from './video-upload-custom.component';

describe('VideoUploadCustomComponent', () => {
  let component: VideoUploadCustomComponent;
  let fixture: ComponentFixture<VideoUploadCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
