import {Injectable} from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'map', type: 'link', name: 'Map', icon: 'av_timer'},
  {state: 'monitor', type: 'link', name: 'VEhicle', icon: 'av_timer'},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
