package com.example.studentdb.repository;

import com.example.studentdb.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {

}