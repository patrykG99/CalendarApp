package com.example.weather.service;

import java.io.IOException;

public interface WeatherService {
     String getWeatherData(String city) throws IOException, InterruptedException;
}
