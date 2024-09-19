import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { ManageCustomerComponent } from './lockally/manage-customer/manage-customer.component';
import { AddCustomerComponent } from './lockally/add-customer/add-customer.component';
import { FrontendPartComponent } from './frontend-part/frontend-part.component';



export const routes: Routes = [
    { path: '', component: ManageCustomerComponent },
    { path: 'task-list', component: TaskListComponent },
    { path: 'add-task', component: AddTaskComponent },
    { path: 'task-item', component: TaskItemComponent },
    { path: 'edit-task', component: AddTaskComponent },
    {path:'frontend-part', component:FrontendPartComponent},
    {path:'manage-customer',component:ManageCustomerComponent},
    {path:'add-customer',component:AddCustomerComponent}
    //   {path:'manage-customer', 
    //     loadComponent:()=> import('./lockally/manage-customer/manage-customer.component').then((m)=> m.ManageCustomerComponent)
    // //    loadChildren:()=> import('./lockally/manage-customer').then((m)=> m.ManageCustomerComponent)

    // },

    // {
    //     path: '',
    //     component: ManageCustomerComponent,
    //     children: [
    //         {
    //             path: 'task-list',
    //             component: TaskListComponent
    //         }
    //     ]
    // }

];
