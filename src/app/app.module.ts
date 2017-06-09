import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ListPageComponent } from './list-page/list-page.component';

import { ListItemsService } from './list-items.service';

import {ROUTES} from './routes';
import { FilterItemsPipe } from './filter-items.pipe';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ModalComponent } from './modal/modal.component';
import { SearchComponent } from './search/search.component';
import { ListItemFormComponent } from './list-item-form/list-item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    FilterItemsPipe,
    ProfilePageComponent,
    ModalComponent,
    SearchComponent,
    ListItemFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ListItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
