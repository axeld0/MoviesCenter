import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-home-button',
  templateUrl: './go-home-button.component.html',
  styleUrls: ['./go-home-button.component.css']
})
export class GoHomeButtonComponent {

  constructor(private router: Router){}

  goHome(){
    this.router.navigate(['']);
  }
}
