import { Input, OnInit, HostBinding, Output, EventEmitter, Component } from '@angular/core';
import { ListItem, ListItemsService } from '../list-items.service';
import { state, trigger, transition, animate, style, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('overlayAnimation', [
      state('*', style({ display: 'none' })),
      state('ready', style({ display: 'block' })),
      transition('* => ready', [
        style({ opacity: 0, display: 'block' }),
        animate('200ms cubic-bezier(.35,0,.25,1)', style({ opacity: 1 }))
      ]),
    ]),
    trigger('containerAnimation', [
      state('*', style({ display: 'none' })),
      state('ready', style({ display: 'block' })),
      transition('* => ready', [
        style({
          display: 'block',
          opacity: 0,
          transform: 'scale(0)',
          transformOrigin: '50% 0%',
          top: '{{ y }}px',
          left: '{{ x }}px',
        }),
        animate('300ms 200ms cubic-bezier(.35,0,.25,1)', style(['*', {transformOrigin: '50% 0%'}]))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
  public modalState: any = '';

  @Input('startCoordinates')
  public startCoordinates: any = {};

  @Output('hide')
  public hideEmitter = new EventEmitter();

  @Output('submit')
  public submitEmitter = new EventEmitter();

  constructor(public listItems: ListItemsService) {}

  ngOnInit() {
    const x0 = (this.startCoordinates['x'] || 0) as number;
    const y0 = (this.startCoordinates['y'] || 0) as number;
    const coords = computeXYValues(x0, y0) || [0, 0];
    const [x, y] = coords;
    this.modalState = {
      value: 'ready',
      params: {x, y}
    };
  }

  hide() {
    this.hideEmitter.next();
  }

  submit(item: ListItem) {
    this.submitEmitter.next(item);
  }

  submitNewItem(item: ListItem) {
    this.listItems.addNew(item);
    this.submit(item);
    this.hide();
  }
}

function computeXYValues(clientX: number, clientY: number) {
  const window = document.body.getBoundingClientRect();
  const wh = window.width / 2;
  const hh = window.height / 2;
  const x = clientX - wh;
  const y = clientY - hh;
  return [clientX, clientY];
}
