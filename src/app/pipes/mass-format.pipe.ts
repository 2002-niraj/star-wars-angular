import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'massFormat'
})
export class MassFormatPipe implements PipeTransform {

  transform(value: string): string {
    return value !== 'unknown' ? `${value} kg` : 'Not specified';;
  }

}
