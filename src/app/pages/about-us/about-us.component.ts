import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  teamMembers = [
    {
      name: "Peter Bonyai",
      title: "angular master pro elite",
      imgSrc: "./assets/img/faces/bp.png",
      href: "#",
      description: "Working on everything."
    },
    {
      name: "Peter Gyorffy",
      title: "angular master pro elite",
      imgSrc: "./assets/img/faces/gyp.png",
      href: "#",
      description: "Working on everything."
    },
    {
      name: "Anna Kiss",
      title: "angular master pro elite",
      imgSrc: "./assets/img/faces/anna_foto.jpg",
      href: "#",
      description: "Working on everything."
    },
    {
      name: "Kalman Kovacsics",
      title: "angular master pro elite",
      imgSrc: "./assets/img/faces/marc.jpg",
      href: "#",
      description: "Working on everything."
    },
    {
      name: "Gyorgy Liptak",
      title: "angular master pro elite",
      imgSrc: "./assets/img/faces/lgy.png",
      href: "#",
      description: "Working on everything."
    },
    {
      name: "Laszlo Szollosi",
      title: "angular css",
      imgSrc: "./assets/img/faces/szl.png",
      href: "#",
      description: "Sysadmin by day, Angular fan by night."
    },
    {
      name: "Gyozo Urbancsok",
      title: "angular master pro elite",
      imgSrc: "./assets/img/faces/marc.jpg",
      href: "#",
      description: "Working on everything."
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
