import { LoggingService } from './../../logging.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoopingListService } from 'src/app/providers/shooping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shooping',
  templateUrl: './shooping.component.html',
  styleUrls: ['./shooping.component.css']
})
export class ShoopingComponent implements OnInit, OnDestroy {
  // @Output() navegacion = new EventEmitter<{navegaPara:string}>();
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Orange', 10),
  //   new Ingredient('Grapes', 1),
  // ];
  ingredients: Ingredient[];
  private igChangedSub: Subscription;
  constructor(private _ingredientesService: ShoopingListService, private loggingSer: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this._ingredientesService.getIngredients();
    this.igChangedSub = this._ingredientesService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loggingSer.printLog('Helo com on init do ShoppingComponent');
  }
  onIngredientAdded(newIngredient: Ingredient) {
    // this.ingredients.push(newIngredient);
    this._ingredientesService.addIngredients(newIngredient);
    // this.navegacion.emit({navegaPara:'S'});
  }

  onEditItem(index: number) {
    this._ingredientesService.startEditing.next(index);
  }
  ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }
}
