import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskInterface } from '../../task-interface';
import {
  MatDialogModule, MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../service/task.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [RouterModule, MatDialogTitle, MatDialogContent, CommonModule, MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit {
  taskList: TaskInterface | any;
  id: any;
  userName: any;
  taskName: any;
  description: any
  task: any = [];

  constructor(private service: TaskService, private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<TaskItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskInterface) {
    // console.log(data);
    this.task.id = data.id,
      this.task.userName = data.userName,
      this.task.selectedTaskType = data.selectedTaskType,
      this.task.startDate = data.startDate,
      this.task.endDate = data.endDate,
      this.task.description = data.description
  }

  ngOnInit(): void {
    this.viewTask
  }

  viewTask(id: number) {
    const task = this.service.viewTask(id);
  }

}
