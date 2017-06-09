import { HostBinding, Component } from '@angular/core';
import { ListItem, ListItemsService } from '../list-items.service';
import { Router } from '@angular/router';
import { stagger, animate, style, transition, trigger, state, query, sequence, group } from '@angular/animations';
import { AppComponent } from '../app.component';
import { FilterItemsPipe } from '../filter-items.pipe';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [
        query('.list-container', style({ height: '0px' })),
        query('.list-item', style({ transform: 'translateY(-100px)', opacity: 0 })),
        group([
          query('.list-item', [
            stagger(100, [
              animate('500ms cubic-bezier(.35,0,.25,1)', style('*'))
            ])
          ]),
          query('.list-container', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ height: '*' }))
          ], { delay: '500ms' })
        ])
      ]),
      transition(':leave', [
        query('.list-item', [
          stagger(-50, [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100px)', opacity: 0 }))
          ])
        ])
      ]),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        style({ height: '!' }),
        query(':enter', style({ height: '0px' }), {optional: true}),
        query(':leave', style({ height: '!' }), {optional: true}),
        group([
          query(':leave', stagger(100, [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({height: '0px'}))
          ]), {optional: true}),
          query(':enter', stagger(100, [
            animate('500ms cubic-bezier(.35,0,.25,1)', style('*'))
          ]), {optional: true}),
          animate('500ms 150ms cubic-bezier(.35,0,.25,1)', style({ height: '*' }))
        ]),
      ]),
    ]),
  ]
})
export class ListPageComponent {
  @HostBinding('@pageAnimation')
  public animatePage = true;

  private _filteredItems: ListItem[] = [];
  private _filterItemsPipe = new FilterItemsPipe();

  constructor(public router: Router, public parentCmp: AppComponent, private _items: ListItemsService) {
    this._filterItems('');
    const debouncer = new Debouncer();
    parentCmp.searchObserver.subscribe(event => {
      debouncer.run(() => {
        this._filterItems(event as string);
      });
    });
  }

  visitItem(item: ListItem) {
    this.router.navigate(['users', item.slug]);
  }

  private _filterItems(query: string) {
    const allItems = this._items.getAll();
    console.log(allItems, query);
    this._filteredItems = query ? this._filterItemsPipe.transform(allItems, query) : allItems;
  }

  get items() {
    return this._filteredItems;
  }

  hasPhoto(item: ListItem) {
    return this._items.hasPhoto(item);
  }

  getPhoto(item: ListItem) {
    return this._items.getPhoto(item);
  }
}

class Debouncer {
  private _previous: any;

  constructor(private _delay: number = 150) {}

  run(fn: () => any) {
    clearTimeout(this._previous);
    this._previous = setTimeout(() => fn(), this._delay);
  }
}
