import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {circle, latLng, LeafletEvent, LeafletMouseEvent, polygon, tileLayer} from "leaflet";
import {LocationService} from "../shared/services/location.service";
import {OsmService} from "../../../../../src/app/material-component/services/osm.service";
import {ConfigService} from "../../../../../src/app/material-component/services/config.service";

@Component({
    selector: 'app-gis-map-osm',
    templateUrl: './gis-map-osm.component.html',
    styleUrls: ['./gis-map-osm.component.scss']
})
export class GisMapOsmComponent implements OnInit {
    styleOfPolygon = `height: ${window.innerHeight}px; width: ${window.innerWidth};`;
    widthOfScreen = window.innerWidth;
    heightOfScreen = window.innerHeight;
    map: any;

    options = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
        ],
        zoom: 5,
        center: latLng(20.86194, 106.68028)
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

    constructor(private locationService: LocationService,
                private osmService: OsmService,
                private configService: ConfigService) {
    }

    ngOnInit() {
        this.map = L.map("map").setView([21.87169463514273, 106.72393798828126], 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">Bản đồ số</a> thanhoangz',
        }).addTo(this.map);
        L.marker([21.87169463514273, 106.72393798828126], this.markerIcon).bindPopup(`huu nghi`).addTo(this.map);
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
                    L.marker([gates[i]?.longitude, gates[i]?.latitude], this.markerIcon).bindPopup(`${gates[i]?.name}`).addTo(this.map);
                }
            }
        })
    }
}
