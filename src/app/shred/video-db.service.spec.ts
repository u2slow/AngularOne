import { TestBed } from '@angular/core/testing';

import { VideoDBService } from './video-db.service';

describe('VideoDBService', () => {
  let service: VideoDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
