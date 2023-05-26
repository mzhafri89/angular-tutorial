import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/core/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  //could just use two way databinding
  // @ViewChild('name', { static: true }) name: ElementRef;
  // @ViewChild('amount', { static: true }) amount: ElementRef;
  @ViewChild('form') form: NgForm;
  editIngredientSubscription: Subscription | undefined;
  editMode: boolean = false;

  //@Output() addIngredient: EventEmitter<Ingredient> = new EventEmitter();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editIngredientSubscription = this.shoppingListService
      .getEditIngredientSubject()
      .subscribe(({ name, amount }: Ingredient) => {
        this.editMode = true;
        this.form.setValue({
          name,
          amount,
        });
      });
  }

  ngOnDestroy(): void {
    this.editIngredientSubscription.unsubscribe();
  }

  // handleClickAdd() {
  //   const n = this.name.nativeElement.value;
  //   const a = parseInt(this.amount.nativeElement.value);
  //   //seems like number is converted to string
  //   if (!n || !a) return;
  //   const ingredient = new Ingredient(
  //     this.name.nativeElement.value,
  //     this.amount.nativeElement.value
  //   );
  //   //this.addIngredient.emit(ingredient);
  //   this.shoppingListService.addIngredient(ingredient);
  // }

  handleClickClear() {
    // this.name.nativeElement.value = '';
    // this.amount.nativeElement.value = 0;
    this.form.resetForm();
    this.disableEditMode();
  }

  submit() {
    const { name, amount } = this.form.value;

    const ingredient = new Ingredient(name, amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.disableEditMode();
    this.form.resetForm();
  }

  disableEditMode() {
    this.editMode = false;
  }

  deleteIngredient() {
    const { name, amount } = this.form.value;

    this.shoppingListService.deleteIngredient(new Ingredient(name, amount));

    this.disableEditMode();
    this.form.reset();
  }
}
