package com.example.weather.Repository;

import com.example.weather.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface NoteRepo extends JpaRepository<Note, Long> {

}
