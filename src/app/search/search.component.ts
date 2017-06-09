import { EventEmitter, Component, Input, Output } from '@angular/core';
import { group, animateChild, trigger, state, transition, animate, style, query } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  animations: [
    trigger('searchBarAnimation', [
      state('active, loading', style({ backgroundColor: '#333', color: 'white' })),
      state('search', style({ backgroundColor: '#fff', color: 'white' })),
      transition('* => *', group([
        style({ height: '!', position: 'relative', overflow: 'hidden' }),
        group([
          query('@showHideAnimation', [
            style({ position: 'absolute', top:0, left:0, right:0}),
            animateChild(),
          ]),
          animate('500ms cubic-bezier(.35,0,.25,1)')
        ]),
      ])),
    ]),
    trigger('showHideAnimation', [
      state('off', style({ display: 'none' })),
      transition('off => on', [
        style({ display: 'block', opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms cubic-bezier(.35,0,.25,1)', style('*'))
      ]),
      transition('on => off', [
        animate('500ms cubic-bezier(.35,0,.25,1)', style({display: 'block', opacity:0, transform: 'translateY(20px)'}))
      ])
    ])
  ],
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input('loading')
  public loading = false;

  @Input('activeValue')
  public activeValue = '';

  @Output('reset')
  public resetEmitter = new EventEmitter();

  @Output('search')
  public searchEmitter = new EventEmitter();

  constructor() { }

  get state() {
    if (this.loading) return 'loading';
    if (this.activeValue) return 'active';
    return 'search';
  }

  reset() {
    this.resetEmitter.emit('');
  }

  processInput(value: string) {
    this.activeValue = '';
    this.searchEmitter.emit(value);
  }
}
