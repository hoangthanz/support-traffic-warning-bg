import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {circle, latLng, LeafletEvent, LeafletMouseEvent, polygon, tileLayer} from "leaflet";
import {LocationService} from "../../../../shared/services/location.service";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpUrlEncodingCodec} from '@angular/common/http';
import {OsmService} from "../../../services/osm.service";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-map-lockup',
  templateUrl: './map-lockup.component.html',
  styleUrls: ['./map-lockup.component.css']
})
export class MapLockupComponent implements OnInit {
  codec = new HttpUrlEncodingCodec;

  keyWordOfLocation = '';

  locationForm = new FormControl('');
  locations: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  pos = {lat:21.217700673132317,lng: 106.72393798828126 };

  latLngBounds = {
    _northEast: { latitude: 21.975842202686614, longitude: 106.99413299560548 },
    _southWest: { latitude: 21.767471018248695, longitude: 106.45408630371095 }
  }
  map: any;
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/icons/gate.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png",
      tooltipAnchor: [16, -28],
    })
  };

  currentLocationIcon = {
    icon: L.icon({
      iconSize: [32, 32],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/icons/current_location.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };
  public containerIcon = {
    icon: L.icon({
      iconSize: [41, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/icons/container-truck.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '...'})
    ],
    zoom: 12,
    center: latLng(21.87169463514273, 106.72393798828126),
  };

  layersControl = {
    baseLayers: {
      // 'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   maxZoom: 18,
      //   attribution: '...'
      // }),
      // 'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
      //   maxZoom: 18,
      //   attribution: '...'
      // })
    },
    overlays: {
      // 'Big Circle': circle([46.95, -122], {radius: 5000}),
      // 'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }

  bounds = L.latLngBounds([21.217700673132317, 105.72692871093751], [22.811630707692423, 107.61657714843751]);

  // center: latLng(21.87169463514273, 106.72393798828126),
  constructor(
    private locationService: LocationService,
    private osmService: OsmService,
    private configService: ConfigService,
  ) {

    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution: '© <a href="https://www.openstreetmap.org/copyright">Bản đồ số</a> thanhoangz',
    // }).addTo(this.map);
    this.locationService.getPosition().then(currentPos => {
      // this.pos.lng = currentPos.lng ?? 21.87169463514273;
      // this.pos.lat = currentPos.lat ?? 106.72393798828126;
      //this.map.flyTo([this.pos.lat, this.pos.lng], 15);
      // L.marker([this.pos.lat, this.pos.lng], this.currentLocationIcon).addTo(this.map);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchLocation(key: string): any {
    const urlQuery = `?q=${this.ngEncode(key ?? '')}&limit=10&format=json&addressdetails=1&json_callback=_l_geocoder_0`

    this.osmService.searchLocation(urlQuery).subscribe((data: any) => {
      console.log(data);
      console.log(typeof(data));
      let objectOfLocation = JSON.parse(data);

      // for (let i = 0; i < data._l_geocoder_0.length; i++) {
      //   this.locations.push(data._l_geocoder_0[i].display_name);
      // }

      console.log(objectOfLocation);
      console.log(this.locations);
    });
  }

  ngEncode(param: string) {
    return this.codec.encodeValue(param);
  }

  ngOnInit(): any {
    this.filteredOptions = this.locationForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


    this.map = L.map("map").setView([21.87169463514273, 106.72393798828126], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">Bản đồ số</a> thanhoangz',
    }).addTo(this.map);
    L.marker([this.pos.lat, this.pos.lng], this.currentLocationIcon).addTo(this.map);
    // L.marker([21.87169463514273, 106.72393798828126], this.markerIcon).addTo(this.map);
    this.map.on("click", (e: any) => {
      L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.map);

    });
    this.getGateInfos();
  }

  getGateInfos() {
    this.configService.getGate().subscribe((response: any) => {
      if (1 == response?.result) {
        const gates = response?.data;
        console.log(gates);
        for (let i = 0; i < gates.length; i++) {
          L.marker([gates[i]?.longitude,gates[i]?.latitude], this.markerIcon).addTo(this.map);
        }
      }
    })
  }
  changeLocation(): any {
    this.map.flyTo([this.pos.lat, this.pos.lng], 12);
    L.marker([this.pos.lat, this.pos.lng], this.currentLocationIcon).addTo(this.map);
    this.options.center = latLng(this.pos.lat, this.pos.lng);
  }

  async onMapReady(map: L.Map) {
    this.map = map;
    // await this.delay(10);
    // this.map.invalidateSize(false);
    // this.autoLoadData().then(value => {
    //   console.log("reloading data....");
    // })
  }


  async onClick($event: LeafletMouseEvent) {
  }


  private clearMap() {
    // this.layers?.forEach(layer => {
    //   this.map.removeLayer(layer);
    // })
    // const markerTemp: any[] = [];
    // for (const marker1 of this.markers) {
    //   if (!this.map.getBounds().contains(marker1.getLatLng())) {
    //     this.map.removeLayer(marker1)
    //   } else {
    //     markerTemp.push(marker1);
    //   }
    // }
    //
    // this.markers = markerTemp;
  }
  async onZoom($event: LeafletEvent) {
    // this.reload();
    // for (const m of this.msgs) {
    //   this.reloadVehicle(m);
    //   await this.delay(10)
    // }
  }
}
