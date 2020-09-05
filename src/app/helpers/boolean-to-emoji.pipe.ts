import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToEmoji'
})
export class BooleanToEmojiPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? '✔️' : '❌'
  }
}