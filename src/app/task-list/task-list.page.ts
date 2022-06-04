import {Component, OnInit} from '@angular/core';
import { DbService, Task } from '../services/db.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {


  tasks: Task[];

  today: number = Date.now();

  constructor(private dbService: DbService) { }


  ionViewDidEnter() {
    this.dbService.getAllTasks().then(data => this.tasks = data);
  }

  deleteToDo(id: number) {
    this.dbService.deleteTask(id)
      .then(data => this.tasks = data);
  }

  ngOnInit() {

  }

}
