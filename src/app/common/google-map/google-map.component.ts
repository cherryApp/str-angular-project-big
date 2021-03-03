import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  height = "300px";
  width = "100%";
  zoom = 4;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    // disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markers = [
    {
      position: {
        lat: 0,
        lng: 0
      },
      label: "Your Position"
    },
    {
      position: {
        lat: 51.509865,
        lng: -0.118092
      },
      label: "London"
    },
    {
      position: {
        lat: 52.950001,
        lng: -1.150000
      },
      label: "Nottingham"
    },
    {
      position: {
        lat: 50.805832,
        lng: -1.087222
      },
      label: "Portsmouth"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.markers[0].position = this.center
    })
  }

}
