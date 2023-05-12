import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() onNavigation: EventEmitter<string> = new EventEmitter();

  onMenuClick(path: string) {
    this.onNavigation.emit(path);
  }
}
