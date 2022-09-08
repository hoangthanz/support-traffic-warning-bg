import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {circle, latLng, polygon, tileLayer} from "leaflet";
import {LocationService} from "../../../shared/services/location.service";

@Component({
  selector: 'app-map-lockup',
  templateUrl: './map-lockup.component.html',
  styleUrls: ['./map-lockup.component.css']
})
export class MapLockupComponent implements OnInit {
  pos = {lng: 0, lat: 0};
  map: any;
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/icons/gate.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
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

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 5,
    center: latLng(16.00, 108.00)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    },
    overlays: {
      'Big Circle': circle([46.95, -122], {radius: 5000}),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }


  constructor(
    private locationService: LocationService
  ) {
    this.locationService.getPosition().then(currentPos => {
      this.pos.lng = currentPos.lng;
      this.pos.lat = currentPos.lat;
      this.map.flyTo([this.pos.lat, this.pos.lng], 15);
      L.marker([this.pos.lat, this.pos.lng], this.currentLocationIcon).addTo(this.map);
    });
  }

  ngOnInit(): any {

    this.map = L.map("map").setView([this.pos.lng, this.pos.lat], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on("click", (e: any) => {
      L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.map);
    });
  }


  changeLocation(): any {
    this.map.flyTo([this.pos.lat, this.pos.lng], 15);
    L.marker([this.pos.lat, this.pos.lng], this.currentLocationIcon).addTo(this.map);
    this.options.center = latLng(this.pos.lat, this.pos.lng);
  }
}
