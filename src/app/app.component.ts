import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-tutorial';
  feature = 'recipe';

  handleNavigation(feature: string) {
    this.feature = feature;
  }
}
