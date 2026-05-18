package com.example.studentdb.controller;

import com.example.studentdb.entity.Student;
import com.example.studentdb.repository.StudentRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepository repository;

    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student createStudent(@Valid @RequestBody Student student) {
        return repository.save(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable String id,@Valid @RequestBody Student updatedStudent) {

    Student existingStudent = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Student not found"));

    existingStudent.setName(updatedStudent.getName());
    existingStudent.setAge(updatedStudent.getAge());
    existingStudent.setCourseId(updatedStudent.getCourseId());
    // add other fields here

    return repository.save(existingStudent);
}

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable String id) {

    Student existingStudent = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    repository.delete(existingStudent);
}
}