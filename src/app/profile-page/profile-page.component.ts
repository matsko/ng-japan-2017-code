import { HostBinding, OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListItemsService, ListItem } from '../list-items.service';
import { style, animate, group, transition, trigger, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [
        query('.avatar, .details', style({ transform: 'translateY(-100px)', opacity: 0 })),
        query('.details .area, .details p', style({ transform: 'translateY(100px)', opacity: 0 })),
        query('.avatar, .details, .details .area, .details p', [
          stagger(100, [
            animate('500ms cubic-bezier(.35,0,.25,1)', style('*'))
          ])
        ])
      ]),
      transition(':leave', group([
        query('.avatar', [
          animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100px)', opacity: 0 }))
        ]),
        query('.details, .details .area, .details p', [
          stagger(-100, [
            animate('500ms 100ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100px)', opacity: 0 }))
          ])
        ]),
      ])),
    ]),
  ]
})
export class ProfilePageComponent implements OnInit {
  @HostBinding('@pageAnimation')
  public animatePage = true;

  public profile: ListItem|any = {};

  constructor(private _router: Router, private _route: ActivatedRoute, private _listItems: ListItemsService) {}

  ngOnInit() {
    this.profile = this._listItems.findBySlug(this._route.snapshot.params['slug']);
    if (!this.profile) {
      this._router.navigateByUrl('/');
      this.profile = {};
    }
  }

  hasPhoto() {
    return this.profile ? this._listItems.hasPhoto(this.profile) : false;
  }

  getPhoto() {
    return this.profile ? this._listItems.getPhoto(this.profile) : null;
  }
}
