package com.example.studentdb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.studentdb.entity.Student;

public interface StudentRepository extends MongoRepository<Student, String> {

}