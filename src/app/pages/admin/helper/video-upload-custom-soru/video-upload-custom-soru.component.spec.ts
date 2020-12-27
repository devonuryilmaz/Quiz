import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadCustomSoruComponent } from './video-upload-custom-soru.component';

describe('VideoUploadCustomSoruComponent', () => {
  let component: VideoUploadCustomSoruComponent;
  let fixture: ComponentFixture<VideoUploadCustomSoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadCustomSoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadCustomSoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
