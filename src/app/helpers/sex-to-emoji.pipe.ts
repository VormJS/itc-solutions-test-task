import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexToEmoji'
})
export class SexToEmojiPipe implements PipeTransform {
  transform(value: string): string {
    return value == 'male' ? '👨' : '👩'
  }
}