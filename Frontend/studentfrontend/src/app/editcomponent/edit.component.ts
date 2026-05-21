import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  student: Student = {
    name: '',
    age: 0,
    courseIds: []
  };

  courseInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StudentService
  ) {}

  saveStudent(): void {
  this.student.courseIds = this.courseInput
    .split(',')
    .map((c: string) => c.trim())
    .filter((c: string) => c.length > 0);

    if (!this.student.id) {
    console.error("Student ID is missing!");
    return;
    }

    this.service.updateStudent(this.student.id, this.student)
    .subscribe(() => {
    alert('Student updated successfully');
    });
}   

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.service.getStudentById(id).subscribe((data: Student) => {
        this.student = data;

        // pre-fill input
        this.courseInput = data.courseIds?.join(', ') || '';
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}