import { AddCommasPipe } from './add-commas.pipe';

describe('AddCommasPipe', () => {
  let pipe;
  beforeEach(() => {
    pipe = new AddCommasPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Author Unknown when authors are not available', () => {
    const authors = pipe.transform(null);
    expect(authors).toEqual('Author Unknown');
  });

  it('should return Author Unknown when empty array of authors is passed', () => {
    const authors = pipe.transform([]);
    expect(authors).toEqual('Author Unknown');
  });

  it('should return given author if one author is passed', () => {
    const authors = pipe.transform(['Author']);
    expect(authors).toEqual('Author');
  });

  it("should return authors with 'and' in between if two authors are passed", () => {
    const authors = pipe.transform(['Author1', 'Author2']);
    expect(authors).toEqual('Author1 and Author2');
  });

  it("should return authors with 'comma' and  'and' in between if three or more authors are passed", () => {
    const authors = pipe.transform(['Author1', 'Author2', 'Author3']);
    expect(authors).toEqual('Author1, Author2 and Author3');
  });
});
