import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { vi } from 'vitest';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { StudentsComponent } from './students.component';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let getStudentsSpy: ReturnType<typeof vi.fn>;

  const mockStudents: Student[] = [
    { id: '1', name: 'Alice', age: 20, courseIds: ['101'] },
    { id: '2', name: 'Bob', age: 21, courseIds: ['102'] },
  ];

  beforeEach(async () => {
    getStudentsSpy = vi.fn().mockReturnValue(of(mockStudents));

    await TestBed.configureTestingModule({
      imports: [StudentsComponent, RouterTestingModule],
      providers: [
        {
          provide: StudentService,
          useValue: {
            getStudents: getStudentsSpy,
            deleteStudent: vi.fn(),
            triggerRefresh: vi.fn(),
            refresh$: EMPTY,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students from the service on init', () => {
    expect(getStudentsSpy).toHaveBeenCalledOnce();
    expect(component.students).toEqual(mockStudents);
  });

  it('should return the student id for trackBy', () => {
    expect(component.trackByStudentId(0, mockStudents[0])).toBe('1');
  });
});
