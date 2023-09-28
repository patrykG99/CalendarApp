package com.example.weather.controllers;

import com.example.weather.service.WeatherService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
@AllArgsConstructor
public class WeatherController {

    private WeatherService weatherService;

    @GetMapping("/weatherData/{city}")
    public ResponseEntity<String> getWeatherData(@PathVariable("city") String city) throws IOException, InterruptedException {
        return ResponseEntity.ok().body(weatherService.getWeatherData(city));
    }

}

