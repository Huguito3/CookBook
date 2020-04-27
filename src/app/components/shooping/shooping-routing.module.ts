import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoopingComponent } from './shooping.component';
import { ShoopingListEditComponent } from './shooping-list-edit/shooping-list-edit.component';

const routes: Routes = [
  {
    path: '', component: ShoopingComponent, children: [
      { path: ':id/edit', component: ShoopingListEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShoopingRoutingModule {

}
