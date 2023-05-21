import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-tutorial';

  constructor(private router: Router, private route: ActivatedRoute) {}

  handleNavigation(feature: string) {
    this.router.navigate([`/${feature}`]);
  }
}
