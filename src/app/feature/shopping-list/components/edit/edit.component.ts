import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  //could just use two way databinding
  @ViewChild('name', { static: true }) name: ElementRef;
  @ViewChild('amount', { static: true }) amount: ElementRef;

  //@Output() addIngredient: EventEmitter<Ingredient> = new EventEmitter();

  constructor(private shoppingListService: ShoppingListService) {}

  handleClickAdd() {
    const n = this.name.nativeElement.value;
    const a = parseInt(this.amount.nativeElement.value);
    //seems like number is converted to string
    if (!n || !a) return;
    const ingredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);
    //this.addIngredient.emit(ingredient);
    this.shoppingListService.addIngredient(ingredient);
  }

  handleClickClear() {
    this.name.nativeElement.value = '';
    this.amount.nativeElement.value = 0;
  }
}
