import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {circle, latLng, polygon, tileLayer} from "leaflet";
import {LocationService} from "../shared/services/location.service";
import {OsmService} from "../../../../../src/app/material-component/services/osm.service";
import {ConfigService} from "../../../../../src/app/material-component/services/config.service";
import {PopUpService} from "../shared/services/popup.service";

@Component({
  selector: 'app-gis-map-osm',
  templateUrl: './gis-map-osm.component.html',
  styleUrls: ['./gis-map-osm.component.scss']
})
export class GisMapOsmComponent implements OnInit {
  data = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Alabama",
          name: "Hữu Nghị",
          data1: 100,
          data2: 200,
          data3: 100,
          data4: 100,
          data5: 100,
          data6: 100,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            22.0060897, 106.6767043
          ]
        },
        properties: {
          state: "Alabama",
          name: "Tân Thanh",
          data1: 200,
          data2: 200,
          data3: 200,
          data4: 200,
          data5: 200,
          data6: 200,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.5362507,107.96727317
          ]
        },
        properties: {
          state: "Alabama",
          name: "Móng cái",
          data1: 1000,
          data2: 1364,
          data3: 1367,
          data4: 1243,
          data5: 154,
          data6: 1213,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.5333253,107.9520463
          ]
        },
        properties: {
          state: "Alabama",
          name: "Bắc Luân 2",
          data1: 500,
          data2: 500,
          data3: 500,
          data4: 500,
          data5: 500,
          data6: 500,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            22.5159137,103.9435922
          ]
        },
        properties: {
          state: "Alabama",
          name: "Lào cai",
          data1: 1000,
          data2: 1364,
          data3: 5367,
          data4: 1243,
          data5: 154,
          data6: 12413,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            22.5861347,106.7187278
          ]
        },
        properties: {
          state: "Alabama",
          name: "Hạ Lang",
          data1: 1000,
          data2: 1364,
          data3: 5367,
          data4: 1243,
          data5: 154,
          data6: 12413,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            23.2906039,105.242088
          ]
        },
        properties: {
          state: "Alabama",
          name: "Phó Bảng",
          data1: 1000,
          data2: 1364,
          data3: 5367,
          data4: 1243,
          data5: 154,
          data6: 12413,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            16.3091064,107.089507
          ]
        },
        properties: {
          state: "Alabama",
          name: "Hồng Vân",
          data1: 1000,
          data2: 1364,
          data3: 5367,
          data4: 1243,
          data5: 154,
          data6: 12413,
          population: 89919951
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            16.6239945,106.5889585
          ]
        },
        properties: {
          state: "Alabama",
          name: "Lao Bảo",
          data1: 500,
          data2: 500,
          data3: 500,
          data4: 500,
          data5: 500,
          data6: 600,
          population: 89919951
        }
      },
    ]
  };
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
                private popupService: PopUpService,
                private osmService: OsmService,
                private configService: ConfigService) {
    }

    ngOnInit() {
      this.map = L.map("map").setView([21.87169463514273, 106.72393798828126], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">Bản đồ số</a> thanhoangz',
      }).addTo(this.map);
      L.marker([21.87169463514273, 106.72393798828126], this.markerIcon).bindPopup(
        `Cửa khẩu: Hữu Nghị`
      ).addTo(this.map);

      L.marker([22.0060897, 106.6767043], this.markerIcon).bindPopup(
        `Cửa khẩu: Tân thanh`
      ).addTo(this.map);

      L.marker([21.5362507,107.96727317], this.markerIcon).bindPopup(
        `Cửa khẩu: Móng cái`
      ).addTo(this.map);

      L.marker([21.5333253,107.9520463], this.markerIcon).bindPopup(
        `Cửa khẩu: Bắc Luân 2`
      ).addTo(this.map);

      L.marker([22.5159137,103.9435922], this.markerIcon).bindPopup(
        `Cửa khẩu: Lào cai`
      ).addTo(this.map);

      L.marker([22.5861347,106.7187278], this.markerIcon).bindPopup(
        `Cửa khẩu: Hạ Lang`
      ).addTo(this.map);

      L.marker([23.2906039,105.242088], this.markerIcon).bindPopup(
        `Cửa khẩu: Phó Bảng`
      ).addTo(this.map);

      L.marker([16.3091064,107.089507], this.markerIcon).bindPopup(
        `Cửa khẩu: Hồng Vân`
      ).addTo(this.map);

      L.marker([16.6239945,106.5889585], this.markerIcon).bindPopup(
        `Cửa khẩu: Lao Bảo`
      ).addTo(this.map);
      this.map.on("click", (e: any) => {
        // L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.map);

      });
      this.getGateInfos();
      this.makeCapitalCircleMarkers();
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

  scaledRadius(val: number, maxVal: number): number {
    return 100 * (val / maxVal);
  }

  makeCapitalCircleMarkers(): void {
    // this.http.get(this.capitals).subscribe((res: any) => {

    const maxPop = Math.max(...this.data?.features?.map(x => x.properties?.population), 0);

    for (const c of this.data.features) {
      const lon = c.geometry.coordinates[1];
      const lat = c.geometry.coordinates[0];
      const circle = L.circleMarker([lat, lon], {
        radius: this.scaledRadius(c.properties.population, maxPop)
      });

      const total = c.properties.data1 + c.properties.data2 + c.properties.data3 + c.properties.data4 + c.properties.data5 + c.properties.data6;
      if(total > 6000) {
        circle.setStyle({fillColor: 'red'});
        circle.setStyle({color: 'red'});
      }
      else if(total > 3001) {
        circle.setStyle({fillColor: 'orange'});
        circle.setStyle({color: 'orange'});
      }
      else if(total > 1001) {
        circle.setStyle({fillColor: 'yellow'});
        circle.setStyle({color: 'yellow'});
      }
      else {
        circle.setStyle({fillColor: 'green'});
        circle.setStyle({color: 'green'});
      }
      console.log(c.properties.population);
      circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
      circle.addTo(this.map);
    }
    // });
  }

  flyto(data: any){
    this.map.flyTo([data[0], data[1]], 15)
  }
}
