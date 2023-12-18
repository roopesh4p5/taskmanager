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
  selectedTask: Task | null = null;
  taskForm!: FormGroup;
  isEditing = false;

  @ViewChild('content', { static: true }) contentModal!: ElementRef;

  constructor(private taskService: TaskService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      this.allTasks = res;
    });
  }

  openModal(content: any, task: Task | null = null) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.isEditing = !!task;

    if (task) {
      this.selectTaskForUpdate(task);
    }

    this.modalService.open(content);
  }

  performTaskAction() {
    if (this.isEditing) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.taskService.createNewTask(newTask).subscribe(() => {
        this.getTaskList();
        this.closeModal();
        this.taskForm.reset();
      });
    }
  }

  selectTaskForUpdate(task: Task) {
    if (!this.taskForm) {
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required]
      });
    }

    this.taskForm.reset();
    this.selectedTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  openUpdate(task: Task) {
    this.openModal(this.contentModal, task);
  }

  updateTask() {
    if (this.taskForm.valid && this.selectedTask) {
      const updatedTask: Task = {
        ...this.selectedTask,
        ...this.taskForm.value,
      };

      this.taskService.updateTask(updatedTask).subscribe(() => {
        this.getTaskList();
        this.closeModal();
        this.taskForm.reset();
        this.selectedTask = null;
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getTaskList();
    });
  }
}
