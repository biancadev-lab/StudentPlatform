import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  getStudentById(id: string): Observable<Student> {
      return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  private apiUrl = 'http://localhost:8081/students';

  constructor(private http: HttpClient) {}

  getStudents(id: string): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  updateStudent(id: string, student: any): Observable<any> {
    return this.http.put(`api/students/${id}`, student);
  }
}