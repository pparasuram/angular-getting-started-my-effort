import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
 // templateUrl: './app.component.html',
  template: `
  <body><h1>{{title}}</h1></body>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular: Getting Started';
}
