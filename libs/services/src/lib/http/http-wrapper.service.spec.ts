import { TestBed } from '@angular/core/testing';
import { HttpWrapperService } from '@workspace/libs/services';
import { HttpClientModule } from '@angular/common/http';

describe('HttpWrapperService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: HttpWrapperService = TestBed.get(HttpWrapperService);
    expect(service).toBeTruthy();
  });
});
