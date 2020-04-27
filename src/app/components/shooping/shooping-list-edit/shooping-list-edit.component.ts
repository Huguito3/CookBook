import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ShoopingListService } from 'src/app/providers/shooping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shooping-list-edit',
  templateUrl: './shooping-list-edit.component.html',
  styleUrls: ['./shooping-list-edit.component.css']
})
export class ShoopingListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('nameInput') amountInput: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private _ingredientesService: ShoopingListService) {
    this.subscription = this._ingredientesService.startEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this._ingredientesService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  addNewItemRecipe(form: NgForm) {
    // const ingName = this.nameInput.nativeElement.value;
    // const ingAmount = this.amountInput.nativeElement.value;

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this._ingredientesService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this._ingredientesService.addIngredients(newIngredient);
    }
    form.reset();
    this.editMode = false;
    //this.ingredientAdded.emit(newIngredient);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this._ingredientesService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
