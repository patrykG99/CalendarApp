package com.example.weather.controllers;

import com.example.weather.model.Note;
import com.example.weather.service.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")

public class NoteController {


    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService){
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public ResponseEntity<List<Note>> getNotes(){
        return ResponseEntity.ok().body(noteService.getNotes());
    }

    @PostMapping("/note")
    public ResponseEntity<Note> addNote(@RequestBody Note newNote){
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.addNote(newNote));
    }
    @DeleteMapping("/note/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") Long noteId){
        noteService.deleteNote(noteId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }






}
