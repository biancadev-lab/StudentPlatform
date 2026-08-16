package com.example.studentdb.entity;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

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

    private List<String> courseIds = new ArrayList<>();

    public Student() {}

    public Student(String name, int age, List<String> courseIds) {
        this.name = name;
        this.age = age;
        this.courseIds = courseIds;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public List<String> getCourseIds() {
        return courseIds;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setCourseIds(List<String> courseIds) {
        this.courseIds = courseIds;
    }
}