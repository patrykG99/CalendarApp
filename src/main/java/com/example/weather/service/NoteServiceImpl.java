package com.example.weather.service;

import com.example.weather.Repository.NoteRepo;
import com.example.weather.model.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepo noteRepo;

    @Autowired
    public NoteServiceImpl(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    public List<Note> getNotes(){
        return noteRepo.findAll();
    }

    @Override
    public Note addNote(Note newNote) {
        return noteRepo.save(newNote);
    }


}
