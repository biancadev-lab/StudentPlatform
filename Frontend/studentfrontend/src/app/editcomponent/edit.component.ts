import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

student: Student | null = null;

  courseInput: string = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StudentService,
    private cdr: ChangeDetectorRef
  ) {  console.log("EDIT COMPONENT CREATED");}

  ngOnInit(): void {

  console.log("NGONINIT RUN");

  const id = this.route.snapshot.paramMap.get('id');

  if (!id) return;

  this.service.getStudentById(id).subscribe((data: Student) => {

    console.log("LOADED:", data);

    this.student = data;

    this.courseInput = (data.courseIds ?? []).join(', ');

    this.loading = false;

    this.cdr.detectChanges();
  });
}

saveStudent(): void {
  if (!this.student?.id) return;

  const updatedStudent: Student = {
    ...this.student,
    courseIds: this.courseInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)
  };

  console.log(updatedStudent);

  this.service.updateStudent(this.student.id, updatedStudent).subscribe({
    next: () => {
      // 1. Tell the service that data has changed
      this.service.triggerRefresh(); 
      
      // 2. Use Angular Router to navigate back smoothly without a hard refresh
      this.router.navigate(['/students']);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Failed to update student:', err);
    }
  });
}

  cancel(): void {
    this.router.navigate(['/students']);
  }

  
}