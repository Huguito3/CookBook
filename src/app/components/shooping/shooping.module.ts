import { SharedModule } from './../../shared/shared.module';
import { ShoopingRoutingModule } from './shooping-routing.module';
import { NgModule } from '@angular/core';
import { ShoopingListComponent } from './shooping-list/shooping-list.component';
import { ShoopingListEditComponent } from './shooping-list-edit/shooping-list-edit.component';
import { ShoopingComponent } from './shooping.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShoopingListComponent,
    ShoopingListEditComponent,
    ShoopingComponent,
  ],
  imports: [
    // CommonModule, El common ahora esta en el shared; En este proyecto el shared module no tiene mucho sentido porque
    // tenemos pocos componentes que seam shareados
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ShoopingRoutingModule,
    // Quando temos poucas rotas podemoas inicializarlas directamente aqui
    // RouterModule.forChild([
    //   {
    //     path: 'shooping-list', component: ShoopingComponent, children: [
    //       { path: ':id/edit', component: ShoopingListEditComponent }
    //     ]
    //   }
    // ])
  ]})

export class ShoopingModule {

}
