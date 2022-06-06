import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTaskToListPageRoutingModule } from './add-task-to-list-routing.module';

import { AddTaskToListPage } from './add-task-to-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTaskToListPageRoutingModule
  ],
  declarations: [AddTaskToListPage]
})
export class AddTaskToListPageModule {}
