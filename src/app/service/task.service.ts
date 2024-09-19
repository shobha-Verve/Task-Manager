import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { TaskInterface } from '../task-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasklist: any = [];
  updateTask: any;

  constructor(private router: Router) {
    this.getAll()
  }

  getAll() {
    let task = localStorage.getItem('taskDetails');
    // console.log(task);
    if (task) {
      this.tasklist = JSON.parse(task);
      // console.log(this.tasklist)
      return this.tasklist
    } else {
      if (this.tasklist == null) {
        console.log("No Record Found");
        this.tasklist = '';
        }

      }
      return null
    }

    saveTasks(array: any) {
      localStorage.setItem('taskDetails', JSON.stringify(array));
      setTimeout(() => {
        this.getAll();
      }, 2000);
    }

    viewTask(id: number) {
      let task = localStorage.getItem('taskDetails');
      for (let i = 0; i < this.tasklist.length; i++) {
        if (this.tasklist[i].id) {
          let task = this.tasklist.filter((x: any) => x.id === id);
          // console.log(task);
          return task
        }
      }
      localStorage.setItem('taskDetails', JSON.stringify(task));
    }

    editTask(id: number) {
      // console.log(id);
      let task = this.tasklist.filter((x: any) => x.id == id)[0];
      localStorage.setItem("taskEditDetails", JSON.stringify(task));
      this.router.navigate(['/edit-task'])

      // console.log(task);
    }

  }







