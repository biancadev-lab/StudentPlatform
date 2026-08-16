import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8081/students';

  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();


  constructor(private http: HttpClient) {}

  getStudents(filter: any): Observable<Student[]> {

  const timestamp = new Date().getTime();
  return this.http.get<Student[]>(`${this.apiUrl}?_ts=${timestamp}`);
  }
  
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  createStudent(student: Student): Observable<Student> {
  return this.http.post<Student>(this.apiUrl, student);
  }

  deleteStudent(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  triggerRefresh(): void {
  this.refreshSubject.next();
  }

}