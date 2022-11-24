import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {circle, latLng, polygon, tileLayer} from "leaflet";
import {LocationService} from "../shared/services/location.service";
import {OsmService} from "../../../../../src/app/material-component/services/osm.service";
import {ConfigService} from "../../../../../src/app/material-component/services/config.service";

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
            21.77169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Alabama",
          name: "Montgomery",
          population: 199518
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.67169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Alaska",
          name: "Juneau",
          population: 32094
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.57169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Arizona",
          name: "Phoenix",
          population: 1626078
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.47169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Arkansas",
          name: "Little Rock",
          population: 198606
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.37169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "California",
          name: "Sacramento",
          population: 501901
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.27169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Colorado",
          name: "Denver",
          population: 704621
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Connecticut",
          name: "Hartford",
          population: 123400
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.12393798828126
          ]
        },
        properties: {
          state: "Delaware",
          name: "Dover",
          population: 37538
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.22393798828126
          ]
        },
        properties: {
          state: "Florida",
          name: "Tallahassee",
          population: 191049
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.32393798828126
          ]
        },
        properties: {
          state: "Georgia",
          name: "Atlanta",
          population: 486290
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.42393798828126
          ]
        },
        properties: {
          state: "Hawaii",
          name: "Honolulu",
          population: 350395
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.52393798828126
          ]
        },
        properties: {
          state: "Idaho",
          name: "Boise",
          population: 226570
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.62393798828126
          ]
        },
        properties: {
          state: "Illinois",
          name: "Springfield",
          population: 114868
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Indiana",
          name: "Indianapolis",
          population: 863002
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.82393798828126
          ]
        },
        properties: {
          state: "Iowa",
          name: "Des Moines",
          population: 217521
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.17169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Kansas",
          name: "Topeka",
          population: 126587
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.27169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Kentucky",
          name: "Frankfort",
          population: 27621
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.37169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Louisiana",
          name: "Baton Rouge",
          population: 225374
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.47169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Maine",
          name: "Augusta",
          population: 18594
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.57169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Maryland",
          name: "Annapolis",
          population: 39321
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.67169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Massachusetts",
          name: "Boston",
          population: 685094
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.77169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Michigan",
          name: "Lansing",
          population: 116986
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Minnesota",
          name: "Saint Paul",
          population: 306621
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.92393798828126
          ]
        },
        properties: {
          state: "Mississippi",
          name: "Jackson",
          population: 166965
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.32393798828126
          ]
        },
        properties: {
          state: "Missouri",
          name: "Jefferson City",
          population: 42895
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.42393798828126
          ]
        },
        properties: {
          state: "Montana",
          name: "Helana",
          population: 31429
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.52393798828126
          ]
        },
        properties: {
          state: "Nebraska",
          name: "Lincoln",
          population: 284736
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.62393798828126
          ]
        },
        properties: {
          state: "Nevada",
          name: "Carson City",
          population: 54745
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "New Hampshire",
          name: "Concord",
          population: 43019
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.82393798828126
          ]
        },
        properties: {
          state: "New Jersey",
          name: "Trenton",
          population: 84964
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.97169463514273, 106.88393798828126
          ]
        },
        properties: {
          state: "New Mexico",
          name: "Santa Fe",
          population: 83776
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.73393798828126
          ]
        },
        properties: {
          state: "New York",
          name: "Albany",
          population: 98251
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.74393798828126
          ]
        },
        properties: {
          state: "North Carolina",
          name: "Raleigh",
          population: 464758
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.75393798828126
          ]
        },
        properties: {
          state: "North Dakota",
          name: "Bismarck",
          population: 72865
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.76393798828126
          ]
        },
        properties: {
          state: "Ohio",
          name: "Columbus",
          population: 879170
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.77393798828126
          ]
        },
        properties: {
          state: "Oklahoma",
          name: "Oklahoma City",
          population: 643648
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.78393798828126
          ]
        },
        properties: {
          state: "Oregon",
          name: "Salem",
          population: 169798
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "Pennsylvania",
          name: "Harrisburg",
          population: 49192
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.82169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "Rhode Island",
          name: "Providence",
          population: 180393
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.83169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "South Carolina",
          name: "Columbia",
          population: 133114
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.84169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "South Dakota",
          name: "Pierre",
          population: 14004
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.85169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "Tennessee",
          name: "Nashville",
          population: 667560
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.86169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "Texas",
          name: "Austin",
          population: 950715
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "Utah",
          name: "Salt Lake City",
          population: 200544
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.88169463514273, 106.79393798828126
          ]
        },
        properties: {
          state: "Vermont",
          name: "Montpelier",
          population: 7484
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Virginia",
          name: "Richmond",
          population: 227032
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Washington",
          name: "Olympia",
          population: 51609
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "West Virginia",
          name: "Charleston",
          population: 47929
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 106.72393798828126
          ]
        },
        properties: {
          state: "Wisconsin",
          name: "Madison",
          population: 255214
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            21.87169463514273, 107.72393798828126
          ]
        },
        properties: {
          state: "Wyoming",
          name: "Cheyenne",
          population: 63624
        }
      }
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
    return 20 * (val / maxVal);
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
      console.log(c.properties.population);
      circle.addTo(this.map);
    }
    // });
  }
}
