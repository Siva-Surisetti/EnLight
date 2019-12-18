import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  let pipe;
  beforeEach(() => {
    pipe = new EllipsisPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should add ellipsis at the end when given string is greater than given length', () => {
    const resultantString = pipe.transform('This is a test message', 7);
    expect(resultantString).toEqual('This is...');
  });

  it('Should return empty string if empty string is passed regardless of limit value', () => {
    const resultantString = pipe.transform('', 7);
    expect(resultantString).toEqual('');
  });

  it('Should return same string if given limit value is greater than string length', () => {
    const resultantString = pipe.transform('This is a test message', 50);
    expect(resultantString).toEqual('This is a test message');
  });

  it('Should consider limit value as 250 if no value is passed to limit', () => {
    const resultantString = pipe.transform('This is a test message');
    expect(resultantString).toEqual('This is a test message');
  });
});
