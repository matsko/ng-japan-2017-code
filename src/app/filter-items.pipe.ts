import { Pipe, PipeTransform } from '@angular/core';
import { ListItem } from './list-items.service';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(value: ListItem[], query?: any): any {
    let str = query as string;
    if (!value || !str) return value;

    str = str.toLowerCase();
    return value.filter(item => {
      return item.name.toLowerCase().indexOf(str) >= 0;
    });
  }

}
