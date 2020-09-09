import { SexToEmojiPipe } from "./sex-to-emoji.pipe";

describe('SexToEmojiPipe', () => {
  const pipe = new SexToEmojiPipe();

  it('should be created', () => {
    expect(pipe).toBeTruthy;
  });

  it('should convert "male" value to "👨"', () => {
    expect(pipe.transform('male')).toBe('👨');
  });

  it('should convert "female" value to "👩"', () => {
    expect(pipe.transform('female')).toBe('👩');
  });

  it('should convert invalid value to "👩"', () => {
    expect(pipe.transform(null)).toBe('👩');
    expect(pipe.transform('random string')).toBe('👩');
  });
});