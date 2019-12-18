import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    expect(service).toBeTruthy();
  });
  it('should log message to console', () => {
    const service: LoggerService = TestBed.get(LoggerService);

    const consoleSpy = spyOn(console, 'log');
    service.logError('test');
    expect(consoleSpy).toHaveBeenCalledWith('test');
  });
});
