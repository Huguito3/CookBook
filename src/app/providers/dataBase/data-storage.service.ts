import { AuthService } from './../../auth/auth.service';
import { RecipeService } from './../recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from 'src/app/models/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {

  }
  // faço o subscribe aqui dado que no me interesa en el componente header tener los resultados.
  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://recipebook-b2ef6.firebaseio.com/recipes.json', recipes).subscribe(
      resp => {
        console.log(resp);

      }
    );
  }

  fetchRecipes() {
    //o take toma el valor actual y ya hace el unsuscribe
    //exhaustMap, aguarda el primer observable terminar, toma el valor del primer observable.

    // return this.authService.user.pipe(take(1), exhaustMap(
    //   user => {
    //     return this.http.get<Recipe[]>('https://recipebook-b2ef6.firebaseio.com/recipes.json', {
    //       params: new HttpParams().set('auth', user.token)
    //     });
    //   }
    // ), map(
    //   recipes => {
    //     //no confudir el map de rxjs con el map con array. El map de array tra
    //     return recipes.map(recipe => {
    //       return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    //     });
    //   }
    // ), tap(
    //   recipes => {
    //     this.recipesService.setRecipes(recipes);
    //   }
    // )
    // );
    return this.http.get<Recipe[]>('https://recipebook-b2ef6.firebaseio.com/recipes.json').pipe(
      map(
        recipes => {
          //no confudir el map de rxjs con el map con array. El map de array tra
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }
      ), tap(
        recipes => {
          this.recipesService.setRecipes(recipes);
        }
      )
    );
  }
}
