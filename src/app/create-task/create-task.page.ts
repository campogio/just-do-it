import { Component, OnInit } from '@angular/core';
import { DbService, Task,TaskList } from '../services/db.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],

})
export class CreateTaskPage implements OnInit {

  private isTaskList = false;
  private isTimeSensitive = false;
  private isLocationSensitive = false;

  private time;
  private location;

  private name: string;


  constructor(private dbService: DbService) { }


  ngOnInit() {
    this.dbService.getAllTasks();
  }

  _ionchange($event: any) {
  }

  create() {
    if(this.isTaskList){

      const list = {} as TaskList;

      list.description = this.name;

      this.dbService.addTaskList(list);

    }else {

      const task = {} as Task;

      task.description = this.name;
      if(this.isTimeSensitive){
        task.dueDate = this.time;
      }else{
        task.dueDate = '';
      }

      if(this.isLocationSensitive){
        task.location = this.location;
      }else {
        task.location = '';
      }
      task.isDone = false;

      this.dbService.addTask(task);
    }
  }
}
