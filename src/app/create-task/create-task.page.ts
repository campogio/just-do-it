import { Component, OnInit } from '@angular/core';
import {StorageService} from '../StorageService';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  providers:[StorageService],

})
export class CreateTaskPage implements OnInit {

  private isTaskList = false;
  private isTimeSensitive = false;
  private isLocationSensitive = false;

  private time;
  private location;

  private name: string;

  private _storage: StorageService | null = null;


  constructor(private storage: StorageService) {
    this._storage= storage;
  }

  ngOnInit() {
    this._storage.init();
  }

  _ionchange($event: any) {
  }

  create() {
    if(this.isTaskList){

    }else {

      let task = {desc: 'Test desc,Lorem Ipsum',
        dueDate: '2023-11-12',
        location: 'Hogwarts',
        done: false,};

      this._storage.addTask(task);
    }
  }
}
