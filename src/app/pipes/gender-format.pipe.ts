import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFormat'
})
export class GenderFormatPipe implements PipeTransform {

  transform(value: string): string {
    return value !== 'n/a' ? value : 'Not specified';
  }

}
