package com.example.internaljobpostingbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String resumeUrl;
    public Candidate(){
    }

    public Candidate(Long id, String name, String email, String resumeUrl){
        this.id = id;
        this.name = name;
        this.email = email;
        this.resumeUrl = resumeUrl;
    }

    @Override
    public String toString(){
        return "Candidate{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", resumeUrl='" + resumeUrl + '\'' +
                '}';
    }
}
