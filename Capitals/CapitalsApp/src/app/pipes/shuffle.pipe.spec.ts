import { ShufflePipe } from './shuffle.pipe';

describe('ShufflePipe', () => {
  let pipe: ShufflePipe;

  beforeEach(() => {
    pipe = new ShufflePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('providing invalid value returns null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('providing an array returns an array of the same legth', () => {
    const newArray = pipe.transform(['one', 'two', 'three']);
    expect(newArray.length).toEqual(3);
  });
});
