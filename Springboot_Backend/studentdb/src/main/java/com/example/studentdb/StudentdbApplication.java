package com.example.studentdb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.studentdb.entity.Student;
import com.example.studentdb.repository.StudentRepository;
import java.util.List;
import java.util.ArrayList;

@SpringBootApplication
public class StudentdbApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(StudentdbApplication.class, args);
    }

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public void run(String... args) throws Exception {


 if (studentRepository.count() == 0) {
	
        Student student1 = new Student("Anna Becker", 20, List.of("101", "105"));
        Student student2 = new Student("Julian Becker", 22, List.of("102"));
        Student student3 = new Student("Lukas Wiedner", 19, List.of("103"));
        Student student4 = new Student("Elias Lober", 21, List.of("104", "1020"));
        Student student5 = new Student("David Mueller", 23, List.of("105"));


        studentRepository.save(student1);
        studentRepository.save(student2);
        studentRepository.save(student3);
        studentRepository.save(student4);
        studentRepository.save(student5);

        System.out.println("Seed data inserted");
    } else {
        System.out.println("Database already contains data");
    }
 }
}