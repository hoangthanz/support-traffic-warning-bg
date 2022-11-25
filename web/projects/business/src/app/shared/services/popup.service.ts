import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div class="flex justify-between">Cửa khẩu: <span class="font-bold">${ data?.name }</span></div>` +
      `<div class="flex justify-between">Hàng hóa xuất nhập khẩu thông thường: <span class="font-bold flex justify-end">${ data?.data1 }&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Tạm nhập tái xuất - Hoa quả nông sản: <span class="font-bold flex justify-end">${ data?.data2 }&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Hoa quả, nông sản xuất nhập khẩu có nguồn gốc từ nước thứ 3: <span class="font-bold flex justify-end">${ data?.data3 }&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Tạm nhập tái xuất - Các mặt hàng còn lại: <span class="font-bold flex justify-end">${ data?.data4 } &nbsp;<img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Chở quặng xuất khẩu: <span class="font-bold flex justify-end">${ data?.data5 } &nbsp;<img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Hàng hóa khác: <span class="font-bold flex justify-end">${ data?.data6 } &nbsp;<img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Tổng số lượng xe: <span class="font-bold flex justify-end">${ data?.data1 +data?.data2 +data?.data3 +data?.data4 +data?.data5 + data?.data6 }&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/shipped.png"></span></div>`
  }


  makeTramPopup(data: any, tram: any, len: any): string {
    return `` +
      `<div class="flex justify-between">Trạm: <span class="font-bold">${ tram?.name }</span></div>` +
      `<div class="flex justify-between">Hàng hóa xuất nhập khẩu thông thường: <span class="font-bold flex justify-end">${ data?.data1/len }&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Tạm nhập tái xuất - Hoa quả nông sản: <span class="font-bold flex justify-end">${ data?.data2 /len}&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Hoa quả, nông sản xuất nhập khẩu có nguồn gốc từ nước thứ 3: <span class="font-bold flex justify-end">${ data?.data3/len }&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Tạm nhập tái xuất - Các mặt hàng còn lại: <span class="font-bold flex justify-end">${ data?.data4/len } &nbsp;<img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Chở quặng xuất khẩu: <span class="font-bold flex justify-end">${ data?.data5/len } &nbsp;<img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Hàng hóa khác: <span class="font-bold flex justify-end">${ data?.data6/len } &nbsp;<img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/vehicle.png"></span></div>` +
      `<div class="flex justify-between">Tổng số lượng xe: <span class="font-bold flex justify-end">${ (data?.data1 +data?.data2 +data?.data3 +data?.data4 +data?.data5 + data?.data6)/len }&nbsp; <img class="ml-1" style="width: 20px; height: 20px" src="../../../assets/images/shipped.png"></span></div>`
  }
}
