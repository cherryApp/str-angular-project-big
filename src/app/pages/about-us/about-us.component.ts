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
      title: "aspiring developer",
      imgSrc: "./assets/img/faces/bp.png",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO",
      description: "Still learning and has a lot to learn."
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
      title: "angular student",
      imgSrc: "./assets/img/faces/ka.jpg",
      href: "#",
      description: "Just learning Angular universe."
    },
    {
      name: "Kalman Kovacsics",
      title: "angular master pro elite",
      imgSrc: "./assets/img/faces/kk.jpg",
      href: "#",
      description: "Working on everything."
    },
    {
      name: "Gyorgy Liptak",
      title: "Teacher/Copy Editor",
      imgSrc: "./assets/img/faces/lgy.jpg",
      href: "#",
      description: "Teaching English, learning Angular."
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
      title: "intrigued",
      imgSrc: "./assets/img/faces/gyozo.jpg",
      href: "#",
      description: "Wondering how all this works."
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
