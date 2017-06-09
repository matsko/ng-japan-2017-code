import {Component, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, RouterOutlet, NavigationEnd, NavigationStart} from '@angular/router';
import {animation, animateChild, trigger, group, transition, animate, style, query} from '@angular/animations';
import {DEFAULT_ITEMS} from './default-items';
import {ListItem, ListItemsService} from './list-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('routeAnimation', [
      transition(':enter', []),
      transition('indexPage <=> profilePage', [
        query('.router-container', style({ position: 'relative '})),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        query(':enter', style({ opacity: 0, transform: 'translateY(400px)' })),
        group([
          query(':leave', animateChild()),
          query('@searchBarAnimation', animateChild()),
        ]),
        group([
          query(':enter', group([
            animate('400ms cubic-bezier(.35,0,.25,1)', style('*')),
            animateChild({ delay: '200ms' })
          ])),
          query(':leave', [
            animate('400ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-400px)', opacity: 0 }))
          ]),
        ]),
      ])
    ])
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public modalIsActive: boolean = false;
  public modalCoordinates: any;
  public activeSearchValue: string;
  public searchObserver = new EventEmitter();
  public loading: boolean = false;

  constructor(public router: Router, public _route: ActivatedRoute, public items: ListItemsService) {
    const USERS_URL_PREFIX = 'users/';
    const USERS_URL_REGEX = new RegExp(USERS_URL_PREFIX + '(.+)/?$');

    this.loadData();
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        const url = event.url;
        if (url.indexOf(USERS_URL_PREFIX) >= 0) {
          const listItemSlug = event.url.match(USERS_URL_REGEX)[1];
          const listItem = this.items.findBySlug(listItemSlug);
          this.populateSearchBoxWithListItem(listItem);
        } else if (url === '/') {
          this.processSearchReset();
        }
      }
    });
  }

  onRouterAnimationDone() {
    this.loading = false;
  }

  populateSearchBoxWithListItem(item: ListItem) {
    this.activeSearchValue = item.name;
  }

  processSearchReset() {
    this.activeSearchValue = '';
    this.visitListPage();
  }

  processSearchInput(value: string) {
    this.searchObserver.next(value);
  }

  private loadData() {
    DEFAULT_ITEMS.forEach(item => this.items.addNew(item));
  }

  prepRouteState(outlet: RouterOutlet) {
    const data = outlet.activatedRouteData;
    return data ? data['animation'] : '';
  }

  launchModal(event: any) {
    this.modalIsActive = true;
    this.modalCoordinates = {
      x: event.clientX,
      y: event.clientY
    };
  }

  visitNextPage(item: ListItem) {
    const isOnProfile = window.location.pathname.indexOf('users') >= 0;
    if (isOnProfile) {
      this.visitListPage();
    } else {
      this.visitProfilePage(item);
    }
  }

  visitListPage() {
    this.router.navigateByUrl('/');
  }

  visitProfilePage(item: ListItem) {
    this.router.navigate(['users/', item.slug]);
  }
}
