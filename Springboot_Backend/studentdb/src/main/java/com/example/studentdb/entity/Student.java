package com.example.studentdb.entity;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {

    @Id
    private String id;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Min(value = 1, message = "Age must be greater than 0")
    private int age;

    @Min(value = 1, message = "CourseId must be greater than 0")
    private int courseId;

    public Student() {
    }

    public Student(String name, int courseId, int age) {
        this.name = name;
        this.courseId = courseId;
        this.age = age;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCourseId() {
        return courseId;
    }

    public int getAge() {
        return age;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public void setAge(int age) {
        this.age = age;
    }
}