import {Injectable} from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'map', type: 'link', name: 'Tra cứu xe', icon: 'map'},
  {state: 'monitor', type: 'link', name: 'Bản đồ', icon: 'map'},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
