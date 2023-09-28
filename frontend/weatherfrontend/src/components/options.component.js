import React, {Component, useEffect, useState} from "react";
import * as events from "events";










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
        <>
            <form onSubmit={getWeather}>
                <label>Location</label>
                <input onChange={(e) => suggestLocation(e.target.value)} value={inputValue} />
                <div id={"suggestions"}>
                    {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(suggestion.name)}

                    >
                        {suggestion.name}
                    </div>
                ))}</div>
                <button type={"submit"}></button>





            </form>
        </>
    );
}

