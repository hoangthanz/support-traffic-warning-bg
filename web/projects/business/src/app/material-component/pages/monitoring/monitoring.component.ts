import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {circle, latLng, LeafletEvent, LeafletMouseEvent, marker, polygon, tileLayer} from "leaflet";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService} from "ngx-cookie-service";
import {DeviceDetectorService} from "ngx-device-detector";
import {IHttpConnectionOptions} from '@microsoft/signalr/dist/esm/IHttpConnectionOptions';
import {AuthenticationService} from "../../../core/guards/authentication.service";
import {ConfigService} from "../../services/config.service";


@Component({
    selector: 'lsn-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, AfterViewChecked {

    private isRemoveControl = false;

    lines: L.Polyline[] = [];

    public layers: any[] = [];

    latLngBounds = {
        _northEast: {latitude: 21.975842202686614, longitude: 106.99413299560548},
        _southWest: {latitude: 21.767471018248695, longitude: 106.45408630371095}
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

    gates: any[] = [];
    gateTargeted: any;

    levels : any[] = [];

    predict: any;
    markerIconOfGate = {
        icon: L.icon({
            iconSize: [60, 60],
            iconAnchor: [5, 60],
            popupAnchor: [15, -50],
            // specify the path here
            iconUrl: "assets/images/icons8-front-gate-open-96.png",
            shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png",
            tooltipAnchor: [16, -28],
        })
    };

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
        private configService: ConfigService
    ) {

    }

    ngOnInit(): void {
        this.getGateInfos();
    }

    ngAfterViewChecked(): void {
        if (this.isRemoveControl) return;
        const dom = document.querySelector('.leaflet-control-attribution.leaflet-control');
        console.log(dom);
        if (dom) {
            this.isRemoveControl = true;
            dom.remove();
        }
    }

    //set gate info to map layer control
    setGateInfoToMapLayerControl(gateInfos: any[]) {
        gateInfos.forEach(gateInfo => {
            this.layers.push(circle([gateInfo.longitude, gateInfo.latitude], {radius: 5000, color: 'red', opacity: 1, weight: 0.1}));
            // @ts-ignore
            this.layers.push(marker([gateInfo.longitude, gateInfo.latitude], this.markerIconOfGate, {title: gateInfo.name, draggable: true}).bindPopup(`${gateInfo.name}`).openPopup());
        });
    }


    calculateDiff(dateSent: any) {
        const currentDate = new Date();
        dateSent = new Date(dateSent);

        return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
    }

    public reloadVehicle(vehicleData: any) {

    }

    async onClick($event: LeafletMouseEvent) {
    }


    async onZoom($event: LeafletEvent) {

    }


    private getVehicles() {
        const str = '?IsPushed=true&IsFinish=false';
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
        this.configService.getGate().subscribe((response: any) => {
            if (1 == response?.result) {
                const gates = response?.data;
                this.gates = gates;
                this.setGateInfoToMapLayerControl(gates);
            }
        })
    }

    getLevels() {
        this.configService.getLevel().subscribe((response: any) => {
            if (1 == response?.result) {
                this.levels = response?.data;
            }
        })
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

}
