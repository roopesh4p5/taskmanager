import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  allTasks: Task[] = [];
  newTask: Task = new Task();
  modal: any;
  selectedTask: Task | null = null;
  taskForm !: FormGroup;

  @ViewChild('content', { static: true }) userInfoModal!: ElementRef;
  @ViewChild('edit', { static: true }) editInfoModal!: ElementRef;

  constructor(private taskService: TaskService, private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.getTaskList()
  }

  getTaskList() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      this.allTasks = res
      console.log(this.allTasks)
    })
  }

  openModal(content: any, task : Task | null = null) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    })
    

  // If a task is provided, prefill the form with its values
  if (task) {
    this.selectTaskForUpdate(task);
  }

  // Open the modal
    this.modalService
      .open(content);
  }


  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.taskService.createNewTask(newTask).subscribe((res) => {
        console.log('New task added:', res);
        this.getTaskList();
        this.taskForm.reset();
      });
    }
  }

  selectTaskForUpdate(task: Task) {
    this.selectedTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  openUpdate(task: Task) {
    this.openModal(this.editInfoModal, task)
    
  }
  updateTask() {
    if (this.taskForm.valid && this.selectedTask) {
      const updatedTask: Task = {
        ...this.selectedTask,
        ...this.taskForm.value,
      };
      this.taskService.updateTask(updatedTask).subscribe((res) => {
        console.log('Task updated:', res);
        this.getTaskList();
        this.taskForm.reset();
        this.selectedTask = null;
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      console.log('task deleted')
      this.getTaskList()
    })
  }
}

