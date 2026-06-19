import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router'; // Add Router & NavigationEnd
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { Subscription, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit, OnDestroy {

  students$!: Observable<Student[]>;
  students: Student[] = [];
  private routerSubscription!: Subscription;

  constructor(
    private studentService: StudentService,
    private router: Router, // Inject the router
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private zone: NgZone // Inject NgZone

  ) {}

  ngOnInit(): void {
    this.loadStudents();

    this.studentService.refresh$.subscribe(() => {
      this.loadStudents();
    });
  }

  loadStudents(filter: any = null) {
    this.studentService.getStudents(filter).subscribe(data => {
      console.log('Fresh students loaded from backend:', data);

      this.zone.run(() => {
          console.log('Inside Zone - Data:', data);
          this.students = data;
        });

        this.students = [];
        this.students = [...data];
      
      // 3. Explicitly tell Angular: "Hey, look at the screen right now!"
      this.cdr.markForCheck();
        this.cdr.detectChanges(); 
    });
  }

  // In students.component.ts
trackByStudentId(index: number, student: Student): string {
  return student.id ?? ''; // Tells Angular exactly which DOM element maps to which ID
}


  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  editStudent(student: Student) {
    console.log('Editing student:', student);
  }

  deleteStudent(id: string | undefined): void {
  if (!id) return;

  // Optional: Add a confirmation dialog so users don't accidentally delete someone
  if (confirm('Are you sure you want to delete this student?')) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        console.log('Student deleted successfully');
        // Trigger the refresh subject to reload the fresh list of students
        this.studentService.triggerRefresh();
      },
      error: (err) => {
        console.error('Error deleting student:', err);
      }
    });
  }
  }
}