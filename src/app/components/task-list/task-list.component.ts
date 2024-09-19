import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../service/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgxPaginationModule, MatButtonModule, CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  taskList: any = [];
  task: any = []
  delete: any;
  searchText: any;
  p: any = 1;
  forSearch: any = [];
  filteredItems= this.taskList;

  constructor(private service: TaskService, public dialog: MatDialog, 
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.taskList = this.service.getAll();
    this.forSearch = this.taskList;
    this.searchText = localStorage.getItem("search");
 
    if (this.p != null) {
      this.p = localStorage.getItem("currentPage");
    }
    else {
      localStorage.removeItem("currentPage");
    }
    
  }

  addAll() {
    localStorage.removeItem("taskEditDetails");
    this.router.navigate(['/add-task']);
  
  }

  editTask(id: number) {
    this.service.editTask(id);
    // console.log(this.p);
    localStorage.setItem("currentPage", this.p);

    if (this.searchText) {
      localStorage.setItem("search", this.searchText);
    }
    else {
      localStorage.removeItem("search")
    }
  }


  viewTask(id: number) {
    const task = this.service.viewTask(id);
    if (task) {
      console.log('Viewing task:', task);
    }
  }

  searchList() {  
    // console.log(this.searchText);
    
    if (this.searchText) {
      this.forSearch = this.taskList.filter((item: any) => item.userName.toLowerCase().includes(this.searchText.toLowerCase()));
      // console.log(this.forSearch);
      this.p = 1;
      return this.taskList.filter((item: any) => item.userName.toLowerCase().includes(this.searchText.toLowerCase()));
      
    } else {
      this.clear()
      localStorage.removeItem('search');
      return this.taskList
    }
    
  }

  clear() {
    this.searchText = "";
    this.forSearch = false;
    localStorage.removeItem("search");
    localStorage.removeItem("currentPage");
  }

  // filterTable(status: string): void {
  //   console.log(status);
    
  //   if (status === 'checked') {
  //     this.filteredItems = this.taskList;
  //   } else {
  //     this.filteredItems = this.taskList.filter((item:any) => item.status === status);
  //   }
  // }

  deleteAlert(id: number, index: any) {
    Swal.fire({
      title: "Do you want to delete it?",
      text: "Delete Task",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        this.deleteTask(id, index);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  deleteTask(id: number, index: any) {
    this.service.getAll();
    console.log(id, index);
    for (let i = 0; i < this.taskList.length; i++) {
      console.log(this.taskList[i].id);
      if (this.taskList[i].id == id) {

        this.taskList.splice(index, 1);
        this.service.saveTasks(this.taskList);

        console.log(`Task with id ${id} deleted.`);
      }
    }
  }

  openDialog(data: any, enterAnimationDuration: any, exitAnimationDuration: any): void {
    this.dialog.open(TaskItemComponent, {
      width: '50%',
      hasBackdrop: false,

      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });
  }

  check_sort: boolean = true;
  sort(event: any) {
    console.log(event);
    switch (event) {
      case "low": {
        this.check_sort = false
        if (event) {
          this.taskList = this.taskList.sort((low: any, high: any) => {

            if (low.userName < high.userName) {
              return -1;
            }
            else if (low.userName > high.userName) {
              return 1;
            }
            else {
              return 0;
            }
          })
          return this.taskList;
        }
        break;
      }
      case "high":
        {
          this.check_sort = true;
          if (event) {
            this.taskList = this.taskList.sort((low: any, high: any) => {
              if (low.userName > high.userName) {
                return -1;
              }

              else {
                return 0;
              }
            })
            return this.taskList;
          }
          break;
        }
    }
  }

}


