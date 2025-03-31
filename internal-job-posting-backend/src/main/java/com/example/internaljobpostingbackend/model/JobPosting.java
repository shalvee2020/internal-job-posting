package com.example.internaljobpostingbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String department;
    public JobPosting() {
    }

    public JobPosting(Long id, String title, String description, String department, String location, Double salary, String employmentType) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.department = department;
       
    }

    @Override
    public String toString() {
        return "JobPosting{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", department='" + department + '\'' +
                
                '}';
    }
};
