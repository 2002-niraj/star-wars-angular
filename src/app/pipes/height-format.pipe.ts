import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightFormat'
})
export class HeightFormatPipe implements PipeTransform {

  transform(value: string): string {
    return value !== 'unknown' ? `${value} cm` : 'Not specified';
  }

}
