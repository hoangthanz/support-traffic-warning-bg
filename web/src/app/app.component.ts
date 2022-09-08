import { Component } from '@angular/core';
import { LocationService } from './shared/services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private  locationService: LocationService
  ) {
    this.locationService.getPosition().then(pos=>
    {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }

}
