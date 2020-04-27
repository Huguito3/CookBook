import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEitComponent } from './recipe-eit/recipe-eit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from 'src/app/recipe-resolver.service';

const routes: Routes = [
  {
    path: '',
    // path: 'recipes',
    canActivate: [AuthGuard],
    component: RecipeComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEitComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeEitComponent, resolve: [RecipeResolverService] },
    ]
  }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
