
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';



const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  // forma mais moderna:
  { path: 'recipes', loadChildren: () => import('./components/recipe/recipes.module').then(m => m.RecipesModule) },
  { path: 'shooping-list', loadChildren: () => import('./components/shooping/shooping.module').then(m => m.ShoopingModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // {
  //   path: 'shooping-list', component: ShoopingComponent, children: [
  //     { path: ':id/edit', component: ShoopingListEditComponent }
  //   ]
  // },
  // {
  //   path: 'recipes',
  //   canActivate: [AuthGuard],
  //   component: RecipeComponent, children: [
  //     { path: '', component: RecipeStartComponent },
  //     { path: 'new', component: RecipeEitComponent },
  //     { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
  //     { path: ':id/edit', component: RecipeEitComponent, resolve: [RecipeResolverService] },
  //   ]
  // },
  // { path: 'auth', component: AuthComponent }
  // { path: 'not-found', component: PageNotFoundComponent },
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not Found'} },
  // { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
