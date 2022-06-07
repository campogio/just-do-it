import {Component, OnInit} from '@angular/core';
import { DbService, Task,TaskList,UserTasks } from '../services/db.service';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  public press = 0;

  userData: UserTasks= {tasks: [],
  taskLists: []};

  taskLists: TaskList[]= [{
    id:420,
    description: 'Hello',
    isAllDone: false,
    tasks: [{id: 5,
      isDone: true,
      taskListid: 1,
      dueDate: '2022-10-10',
      location: 'My Home',
      description: 'This Task Desc',
      userid: undefined,}],
    userid:0,
  }];

  today: number = Date.now();

  constructor(private dbService: DbService, private localNotif: LocalNotifications) { }

  ionViewCanEnter(){
    this.dbService.getAllTasks().then(data => this.userData = data);
  }

  ionViewDidEnter(){
    this.dbService.getAllTasks().then(data => this.userData = data);
    this.scheduleTasks(this.userData);
  }

  scheduleTasks(user: UserTasks) {

    this.localNotif.schedule({
      id: 1,
      text: 'Tasks: '+user.tasks.length,
      data: {secret: 'secret'}
    });



    for (const task of this.userData.tasks) {
      if (task.dueDate !== '') {
        this.schedule(task);
      }
    }

    for (const list of this.userData.taskLists) {
      for (const task of list.tasks) {
        if (task.dueDate !== '') {
          this.schedule(task);
        }
      }
    }

  }

  schedule(task: Task){

    this.localNotif.schedule({
      id: task.id,
      title: 'JustDoIt Reminder',
      text: task.description,
      trigger: {at: new Date(task.dueDate)},
      data: { secret: 'secret' }
    });

  }

  deleteToDo(id: number) {
    this.dbService.deleteTask(id).then(data => this.userData = data);
  }

  deleteList(id: number) {
    this.dbService.deleteTaskList(id).then(data => this.userData = data);
  }


  ngOnInit() {
    this.dbService.getAllTasks().then(data => this.userData = data);
  }

  remove(item: Task) {
  this.deleteToDo(item.id);
  }

  update(item: Task) {
    if (item.isDone){
      this.dbService.updateTask(item.id,1);
    }else{
      this.dbService.updateTask(item.id,0);
    }
  }

  removeList(list: TaskList) {
    this.deleteList(list.id);
  }
}
