import { Component } from '@angular/core';
import { parseJson } from '@siemplify/utils';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  route = '';
  extras = '[]';
  navExtras = '{}';

  constructor(private service: NavigationService) {}

  navigate() {
    const extras = parseJson(this.extras) || [];
    const navs = parseJson(this.navExtras) || {};
    this.service.navigateToModule(this.route, {
      extras,
      navExtras: navs
    });
  }
}
