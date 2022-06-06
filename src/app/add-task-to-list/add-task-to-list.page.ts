import { Component, OnInit } from '@angular/core';
import {DbService, Task, TaskList} from '../services/db.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-task-to-list',
  templateUrl: './add-task-to-list.page.html',
  styleUrls: ['./add-task-to-list.page.scss'],
})
export class AddTaskToListPage implements OnInit {

  private listId = 0;
  private isTimeSensitive = false;
  private isLocationSensitive = false;

  private time;
  private location;

  private name: string;


  constructor(private dbService: DbService, private router: Router,private route: ActivatedRoute) { }


  ngOnInit() {
    this.dbService.getAllTasks();

    this.listId = this.route.snapshot.paramMap.get('id') as unknown as number;

    console.log('List has id:'+this.listId);
  }

  _ionchange($event: any) {
  }

  create() {
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
      task.taskListid = this.listId;

      this.dbService.addTaskToList(task);
    }


}
