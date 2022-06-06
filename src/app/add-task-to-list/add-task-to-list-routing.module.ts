import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTaskToListPage } from './add-task-to-list.page';

const routes: Routes = [
  {
    path: '',
    component: AddTaskToListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTaskToListPageRoutingModule {}
