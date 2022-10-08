import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  circle,
  icon,
  latLng,
  LeafletEvent,
  LeafletMouseEvent,
  marker,
  tileLayer
} from "leaflet";
import { Router } from "@angular/router";
import * as L from 'leaflet';
import { HttpClient } from "@angular/common/http";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from "ngx-cookie-service";
import { DeviceDetectorService } from "ngx-device-detector";
import { interval, Subscription } from "rxjs";
import { IHttpConnectionOptions } from '@microsoft/signalr/dist/esm/IHttpConnectionOptions';
import {AuthenticationService} from "../../../core/guards/authentication.service";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'lsn-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, AfterViewChecked {

  warningLimit = 5;
  remindLimit = 2;
  private isRemoveControl = false;

  // @ts-ignore
  private _hubConnection: HubConnection;

  // @ts-ignore
  animatedMarker;

  msgs: any[] = [];
  lines: L.Polyline[] = [];

  syncTime = Date.now();
  layers: any[] = [];

  latLngBounds = {
    _northEast: { latitude: 21.975842202686614, longitude: 106.99413299560548 },
    _southWest: { latitude: 21.767471018248695, longitude: 106.45408630371095 }
  }

  layersControl = {
    baseLayers: {},
    overlays: {}
  }

  // @ts-ignore
  map: L.Map;
  json: any;
  bounds = L.latLngBounds([21.217700673132317, 105.72692871093751], [22.811630707692423, 107.61657714843751]);

  //http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // maxZoom: 20,
        // minZoom: 9,
        attribution: 'bản đồ'
      }),
      tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
        attribution: 'Bản đồ Lạng Sơn'
      })
    ],
    zoom: 12,
    center: latLng(21.87169463514273, 106.72393798828126),

  };

  public signalROptions!: IHttpConnectionOptions;

  public resForms: any[] = [];

  public licensePlates: string[] = [];

  gates: any;
  gateTargeted: any;
  predict: any;
  mySub: Subscription;

  constructor(
    public router: Router,
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private authService: AuthenticationService,
    public currencyPipe: CurrencyPipe,
    public datePipe: DatePipe,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public jwtHelperService: JwtHelperService,
    public cookieService: CookieService,
    public deviceService: DeviceDetectorService,

  ) {
    this.mySub = interval(10000).subscribe((func => {
      this.autoLoadData().then(value => {
        console.log("reloading data....");
      })
    }))

  }

  ngOnInit(): void {
    this.getGateInfos();
    this.getVehicles();
    let url: string = this.router.url;

    const signalRToken = this.jwtHelperService.decodeToken(this.authService?.userTokenValue?.token);
    const token = `${signalRToken?.signalr}`;

    // @ts-ignore
    this.signalROptions = {
      transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling, accessTokenFactory: async () => {
        return token;
      }
    };


    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.signalr_domain}/vehicle`, this.signalROptions)
      .configureLogging(LogLevel.Information)
      .build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch((err:any) => console.log('Error while establishing connection :('));

    this._hubConnection.on('ReceiveCoordinateVehicle', (data: any) => {
      this.msgs = this.msgs.filter(v => v.id != data?.id);
      this.msgs.push(data);
      this.reloadVehicle(data);
    });
  }

  ngAfterViewChecked(): void {
    if(this.isRemoveControl) return;
    const dom = document.querySelector('.leaflet-control-attribution.leaflet-control');
    console.log(dom);
    if(dom){
      this.isRemoveControl = true;
      dom.remove();
    }
  }

  calculateDiff(dateSent: any){
    const currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  public reloadVehicle(vehicleData: any) {
    // const bounds = this.map.getBounds();
    // const currentVehicle = this.licensePlates.filter(lp => vehicleData.licensePlate === lp)[0];
    // const marker = this.markers.filter(m => m?.getId() == vehicleData.id)[0];
    //
    // if (!currentVehicle)
    //   return;
    //
    // if (marker) {
    //   marker?.slideTo([vehicleData.latitude, vehicleData.longitude], {
    //     duration: 1500
    //   });
    // } else {
    //   let trafficContent = `<div class='right'><b>10</b></div><div class='clearfix'></div>`;
    //   trafficContent += `<p>dichuyen<b>${vehicleData?.licensePlate?.toUpperCase()}</b></p>`;
    //   console.log(vehicleData.timeStamp)
    //   if (vehicleData && vehicleData.timeStamp != null) {
    //     trafficContent += `<p>vi tri<b>${(new Date(vehicleData.timeStamp * 1000)).format('DD-MM-YYYY HH:mm:ss')}</b></p>`;
    //   }
    //   if (bounds.contains([vehicleData.latitude, vehicleData.longitude])) {
    //     const marker = new DriftMarker([vehicleData.latitude, vehicleData.longitude], {
    //       icon: icon({
    //         iconSize: [30, 41],
    //         iconAnchor: [13, 41],
    //         iconUrl: this.calculateDiff(new Date(vehicleData.timeStamp * 1000)) > 1 ? 'assets/icons/map-icons/vehicle-offline.png' : 'assets/icons/map-icons/vehicle1.png',
    //         shadowUrl: 'assets/marker-shadow.png'
    //       })
    //     });
    //     marker.setId(vehicleData.id.toString());
    //     marker.bindPopup(trafficContent).addTo(this.map);
    //     this.map.addLayer(marker);
    //     marker?.slideTo([vehicleData.latitude, vehicleData.longitude], {
    //       duration: 1500
    //     });
    //     this.markers.push(marker);
    //   }
    // }
  }

  public reload() {
    this.clearMap();
    // this.getTrafficInfo();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  marker: any;


  // eslint-disable-next-line @typescript-eslint/member-ordering
  markers: any[] = [];

  async onMapReady(map: L.Map) {
    this.map = map;
    await this.delay(10);
    this.map.invalidateSize(false);
    this.autoLoadData().then(value => {
      console.log("reloading data....");
    })
  }


  async onClick($event: LeafletMouseEvent) {
  }


  private clearMap() {
    this.layers?.forEach(layer => {
      this.map.removeLayer(layer);
    })
    const markerTemp: any[] = [];
    for (const marker1 of this.markers) {
      if (!this.map.getBounds().contains(marker1.getLatLng())) {
        this.map.removeLayer(marker1)
      } else {
        markerTemp.push(marker1);
      }
    }

    this.markers = markerTemp;
  }

  async autoLoadData() {
    this.reload();
    for (const m of this.msgs) {
      this.reloadVehicle(m);
      await this.delay(10)
    }
  }

  async onZoom($event: LeafletEvent) {
    // this.reload();
    // for (const m of this.msgs) {
    //   this.reloadVehicle(m);
    //   await this.delay(10)
    // }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getVehicles() {
    const str = '?IsPushed=true&IsFinish=false';

    // this.monitorService.searchVehicle({ licencePlate: null }).subscribe(
    //   (req: any) => {
    //     if (1 !== req.result) {
    //       this.resForms = [];
    //       return;
    //     }
    //
    //     this.resForms = req.data;
    //     const details = this.resForms.map(detail => { return { licensePlates: detail?.licensePlate } });
    //     let licensePlateObjects: any[] = [];
    //     details.forEach(element => {
    //       licensePlateObjects = licensePlateObjects.concat(element.licensePlates);
    //     });
    //
    //     this.licensePlates = [...new Set(licensePlateObjects)];
    //     // console.log(this.licensePlates);
    //     // this.getTrafficInfo();
    //   },
    //   (error) => {
    //     this.resForms = [];
    //     this.licensePlates = [];
    //   }
    // );
  }


  openDialog(): void {
    // const dialogRef = this.dialog.open(SearchVehicleDialogComponent, {
    //   panelClass: "dialog-responsive-30",
    //
    // });
    //
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (!result || result.length > 0) {
    //     const pos = result[0];
    //     console.log(pos);
    //
    //     /*latitude: 21.97168177583208
    //       licensePlate: "37A55555"
    //       longitude: 106.75296921534269
    //     */
    //     this.map.panTo({ lng: pos?.longitude, lat: pos?.latitude })
    //   }
    // });
  }

  getGateInfos() {
    // this.monitorService.getGateCatalog().subscribe((response: any) => {
    //   if (1 == response?.body?.result) {
    //     this.gates = response?.body?.data;
    //     this.gateTargeted = this.gates[0];
    //     this.getTrafficPredict(this.gateTargeted);
    //   }
    // })
  }

  changeGate(gateTargeted: any) {
    this.gateTargeted = gateTargeted;
    this.getTrafficPredict(this.gateTargeted);
  }

  getTrafficPredict(gateTargeted: any) {
    // this.monitorService.getTrafficPredict(gateTargeted?.id).subscribe(response => {
    //   if (1 == response?.result) {
    //     this.predict = response.data;
    //   }
    // });
  }

  private async rengerVehicleToMap() {
    for (const m of this.msgs) {
      this.reloadVehicle(m);
      await this.delay(10)
    }
  }

}
