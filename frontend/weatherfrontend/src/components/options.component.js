import React, {Component, useEffect, useState} from "react";
import * as events from "events";
import Calendar from "./calendar.component";










export default function Options(){

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);







    async function suggestLocation(value){

        setInputValue(value);
        const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${value}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setSuggestions(result)
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        
    }

    async function getWeather(){
        const url = `http://localhost:8080/api/weatherData/`+inputValue
        const options = {
            method: 'GET'
        }
        let response = await fetch(url,options)
        let actualWeather = response.json()

        console.log(actualWeather)
    }
    const handleClick = (value) => {
        setInputValue(value);
        setSuggestions([]); // czyści podpowiedzi po kliknięciu
    };



    return (
        <div>
            <input
                value={inputValue}
                onInput={(e) => suggestLocation(e.target.value)}
            />
            <div>
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(suggestion.name)}
                        // Tu możesz dodać dodatkowe style lub klasy
                    >
                        {suggestion.name}
                    </div>
                ))}
            </div>
            <div>

            </div>
        </div>
    );
}

