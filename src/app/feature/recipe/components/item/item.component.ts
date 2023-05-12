import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: Recipe | undefined;

  @Output() clickItem: EventEmitter<void> = new EventEmitter();

  handleClick() {
    this.clickItem.emit();
  }
}
