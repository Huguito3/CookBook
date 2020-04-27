import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEitComponent } from './recipe-eit/recipe-eit.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeComponent,
    RecipeStartComponent,
    RecipeEitComponent],
  imports: [
    // CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    AuthModule
  ],
  // no precisamos exportarlos si no los usamos em otro ngmodule
  // exports: [
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipeDetailComponent,
  //   RecipeComponent,
  //   RecipeStartComponent,
  //   RecipeEitComponent
  // ]
})
export class RecipesModule { }
