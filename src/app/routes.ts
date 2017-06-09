import {ListPageComponent} from './list-page/list-page.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';

export const ROUTES = [
  { path: '',
    component: ListPageComponent,
    data: {
      animation: 'indexPage'
    }
  },
  { path: 'users/:slug',
    component: ProfilePageComponent,
    data: {
      animation: 'profilePage'
    }
  }
];
