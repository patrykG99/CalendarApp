package com.example.weather.service;

import com.example.weather.model.Note;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NoteService {
    public List<Note> getNotes();
    public Note addNote(Note newNote);
}
