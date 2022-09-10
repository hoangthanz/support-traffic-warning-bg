import {Component, OnInit} from '@angular/core';
import {circle, latLng, polygon, tileLayer} from "leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.scss']
})
export class VehicleRegisterComponent implements OnInit {
  public map: any;
  public markerIcon = {
    icon: L.icon({
      iconSize: [41, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/icons/container-truck.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };
  public options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 5,
    center: latLng(16.00, 108.00)
  };

  public layersControl = {
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
  searchText: any;
  types: any;
  selectedType: any;

  constructor() {
  }

  ngOnInit(): void {
    this.types = [
      {value: '1', viewValue: 'Hữu Nghị'},
      {value: '2', viewValue: 'Tân Thanh'},
    ];
    this.selectedType = this.types[0].value;
    this.map = L.map("map").setView([16.00, 108.00], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on("click", (e: any) => {
      console.log(e.latlng); // get the coordinates
      L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.map); // add the marker onclick
    });
  }


}
