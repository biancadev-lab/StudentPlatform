import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {

  students: Student[] = []; 

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(filter: any = null) {
    this.studentService.getStudents(filter).subscribe(data => {
      this.students = data;
    });
  }

  editStudent(student: Student) {
  console.log('Editing student:', student);
  }
  
}