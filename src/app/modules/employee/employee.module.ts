import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './dashboard/task-component/task/task.component';
import { EditTaskComponent } from './dashboard/task-component/edit-task/edit-task.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TaskComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
