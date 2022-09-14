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
  {state: 'permission-for-role', type: 'link', name: 'Phân quyền', icon: 'av_timer'},
  {state: 'vehicle-tracking', type: 'link', name: 'Tra cứu xe', icon: 'assignment_turned_in'},
  {state: 'account-config', type: 'link', name: 'Cấu hình tài khoản', icon: 'crop_7_5'},
  {state: 'gate-config', type: 'link', name: 'Cấu hình cửa khẩu', icon: 'view_comfy'},
  {state: 'station-config', type: 'link', name: 'Cấu hình trạm', icon: 'view_list'},
  {state: 'lists', type: 'link', name: 'Khai báo lưu lượng', icon: 'view_list'},
  {state: 'map-lockup', type: 'link', name: 'Bản đồ', icon: 'view_headline'},
  {state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab'},
  {state: 'stepper', type: 'link', name: 'Stepper', icon: 'web'},
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  {state: 'chips', type: 'link', name: 'Chips', icon: 'vignette'},
  {state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail'},
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  {state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant'},
  {state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb'},
  {state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode'},
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
