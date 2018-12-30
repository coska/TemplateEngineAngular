import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mymenufilter',
    pure: false
})
export class MyMenuFilterPipe implements PipeTransform {
    transform(items: any[]): any {
        //if (!items || !filter) {
        //    return items;
        //}
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.disabled !== true);
    }
}