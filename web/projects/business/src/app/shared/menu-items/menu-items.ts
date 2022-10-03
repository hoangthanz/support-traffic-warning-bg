import {Injectable} from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'dashboard', type: 'link', name: 'Dashboard', icon: 'av_timer'},
  {state: 'vehicle-traffic-chart', type: 'link', name: 'Biểu đồ lưu lượng xe', icon: 'av_timer'},
  {state: 'role', type: 'link', name: 'Cấu hình nhóm quyền ', icon: 'view_list'},
  {state: 'permission-for-role', type: 'link', name: 'Phân quyền', icon: 'av_timer'},
  {state: 'vehicle-tracking', type: 'link', name: 'Tra cứu xe', icon: 'assignment_turned_in'},
  {state: 'account-config', type: 'link', name: 'Cấu hình tài khoản', icon: 'crop_7_5'},
  {state: 'gate-config', type: 'link', name: 'Cấu hình cửa khẩu', icon: 'view_comfy'},
  {state: 'station-config', type: 'link', name: 'Cấu hình trạm', icon: 'view_list'},
  {state: 'level', type: 'link', name: 'Cấu hình mức độ', icon: 'view_comfy'},
  {state: 'vehicle', type: 'link', name: 'Phương tiện', icon: 'view_comfy'},
  {state: 'company', type: 'link', name: 'Công ty', icon: 'assignment_turned_in'},
  // {state: 'lists', type: 'link', name: 'Khai báo lưu lượng', icon: 'view_list'},
  {state: 'map-lockup', type: 'link', name: 'Bản đồ', icon: 'view_headline'},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
