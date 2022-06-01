import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(
    value: { name: string  }[],
    search: string
  ): { name: string}[] {
    if (value) {
      const regexp = new RegExp(search, 'i');
      let val = value[0];
      
      if(val) {
        const properties = Object.keys(value[0]);    
        
        return [
          ...value.filter((item) => {
            return properties.some((property) => regexp.test(item[property]));
          }),
        ];
      } else {
        return {name:"no"}[0];
      }
  }
  }
}
