import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export interface Task {
  id: number;
  description: string;
  isDone: boolean;
  dueDate: string;
  location: string;
  userid: number;
  taskListid: number;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private dbInstance: SQLiteObject;

  constructor(private sqlite: SQLite) { }


  async getAllTasks() {
    let todos: Task[] = [];
    return this.sqlite.create({ name: 'data.db', location: 'default' }).then(
      (db) => {
        this.dbInstance = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS '
          + 'task(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' description VARCHAR(50), isDone INTEGER(1), dueDate TEXT, location TEXT,'
          + ' user_id INTEGER, taskList_id INTEGER)', [])
          .catch(e => console.log(e));
        todos = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return todos;
    });
  }


  //Test Task seed
  private seedTasks(){
    this.dbInstance.executeSql('INSERT or IGNORE INTO task(id, description, isDone,dueDate,location,user_id,taskList_id)'
      + ' VALUES (1, \'test task\', 0,\'2022-09-11\',\'location\',0,null);');
  }

  private getAllRecords(): Task[] {
    const todos: Task[] = [];
    this.dbInstance.executeSql('select * from task', []).then(
      (res) => {
        for(let x=0; x<res.rows.length; x++)
          {todos.push(res.rows.item(x));}
      }
    ).catch(e => {
      console.log(e);
    });
    return todos;
  }

  async addTask(task: Task) {
    if(task.location === undefined){
      task.location = '';
    }
    if(task.dueDate === undefined){
      task.dueDate = '';
    }
    this.dbInstance.executeSql('insert into task(description, isDone,dueDate,location) VALUES(?, ?,?,?)',
      [task.description, 0,task.dueDate,task.location])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async updateTask(id: number) {
    this.dbInstance.executeSql('UPDATE task SET isDone=1 WHERE id=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteTasks(){
    this.dbInstance.executeSql('DELETE FROM task')
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteTask(id: number) {
    this.dbInstance.executeSql('DELETE FROM task WHERE id=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }
}
