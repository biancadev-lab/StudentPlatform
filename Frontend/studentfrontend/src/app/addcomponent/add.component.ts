import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html'
})
export class AddComponent {

  // Initialisierung mit leeren Werten
  student: Student = {
    name: '',
    age: 0,
    courseIds: []
  };

  courseInput: string = '';

  constructor(
    private router: Router,
    private service: StudentService
  ) {}

  saveStudent(): void {
    if (!this.student.name.trim()) {
      alert('Please enter a name.');
      return;
    }

    const newStudent: Student = {
      ...this.student,
      courseIds: this.courseInput
        .split(',')
        .map(c => c.trim())
        .filter(Boolean)
    };

    this.service.createStudent(newStudent).subscribe({
      next: () => {

        this.service.triggerRefresh(); 

        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error('Failed to create student:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}