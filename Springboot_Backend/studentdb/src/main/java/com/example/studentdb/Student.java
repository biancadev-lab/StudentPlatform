package com.example.studentdb;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {

    @Id
    private String id;

    private String name;
    private int age;
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