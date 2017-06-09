import { Injectable } from '@angular/core';

export interface InfoItem {
  type: string;
  value: string;
}

export interface ListItem {
  name: string;
  slug: string;
  photo?: string;
  photo_base64?: string;
  information: InfoItem[];
  aboutContent?: string;
  blurb: string;
  date?: Date;
}

@Injectable()
export class ListItemsService {
  private _items: ListItem[] = [];

  constructor() { }

  getAll() {
    return this._items;
  }

  findBySlug(slug: string) {
    return this._items.find(item => item.slug === slug);
  }

  addNew(item: ListItem) {
    this._items.push(item);
  }

  destroy(item: ListItem) {
    const index = this._items.indexOf(item);
    if (index >= 0) {
      this._items.splice(index, 1);
    }
  }

  hasPhoto(item: ListItem) {
    return item.photo || item.photo_base64;
  }

  getPhoto(item: ListItem) {
    if (item.photo)  {
      return `assets/users/${item.photo}`;
    } else if (item.photo_base64) {
      return item.photo_base64;
    }
    return '';
  }

  isUniqueSlug(slug: string) {
    for (let i = 0; i < this._items.length; i++) {
      const item = this._items[i];
      if (item.slug === slug) {
        return false;
      }
    }
    return true;
  }
}

