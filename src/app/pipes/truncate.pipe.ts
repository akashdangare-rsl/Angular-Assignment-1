import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  limit = 50;
  transform(value: string): string {
    if (!value) return '';
    if (value.length <= this.limit) return value;
    return value.substring(0, this.limit) + '...';
  }
}
