import { BooleanToEmojiPipe } from "./boolean-to-emoji.pipe";

describe('BooleanToEmojiPipe', () => {
  const pipe = new BooleanToEmojiPipe();

  it('should be created', () => {
    expect(pipe).toBeTruthy;
  });

  it('should convert truth values to "✔️"', () => {
    expect(pipe.transform(true)).toBe('✔️');
  });

  it('should convert falsy values to "❌"', () => {
    expect(pipe.transform(false)).toBe('❌');
    expect(pipe.transform(null)).toBe('❌');
  });
});