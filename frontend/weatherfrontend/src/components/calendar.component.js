import React, {useEffect, useState} from 'react';
import "./styles.scss"

const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

const getDayName = (day, month, year) => {
    const days = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
    const date = new Date(year, month, day);
    return days[date.getDay()];
};


const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [weather, setWeather] = useState('')
    const [hasLoaded, setHasLoaded] = useState(false)

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysOfMonth = Array.from({length: daysInMonth}, (_, i) => i + 1);

    const handleDayClick = (event) => {
        const clickedDay = event.currentTarget.getAttribute('data-day');
        const clickedMonth = event.currentTarget.getAttribute('data-month');
        console.log(`Kliknięto dzień: ${clickedDay}, miesiąc: ${clickedMonth}`);
    };

    const handleNextMonth = () => {
        setDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handlePrevMonth = () => {
        setDate(new Date(currentYear, currentMonth - 1, 1));
    };

    useEffect(() => {
        async function fetchData() {
            const url = `http://localhost:8080/api/weatherData/Bydgoszcz`
            const options = {
                method: 'GET'
            }
            let response = await fetch(url, options)
            let actualWeather = await response.json()
            setWeather(actualWeather)
            setHasLoaded(true)

        }

        fetchData();


    }, []);

    const getWeatherForDay = (day, month, year) => {
        const allDays = weather.forecast.forecastday;


        const found = allDays.find(w => {
            const [wYear, wMonth, wDay] = w.date.split('-').map(Number)
            return wDay === day && wMonth === month && wYear === year


        })

        return found ? "max " + found.day.maxtemp_c + " °C" : null

    }


    return (
        <>
            <div><h2>{months[currentMonth]}</h2></div>
            {hasLoaded ? <>
                <div className={"calendar"}>
                    {daysOfMonth.map((day, index) => (
                        <div
                            key={index}
                            className="dayCard"
                            data-day={day}
                            data-month={currentMonth}
                            onClick={handleDayClick}
                            style={{display: 'flex'}}
                        >
                            <div className={"header"}>
                                <div style={{width: '50%'}}>{day}, {getDayName(day, currentMonth, currentYear)}</div>
                                <div style={{
                                    width: '50%',
                                    float: 'right'
                                }}>{getWeatherForDay(day, currentMonth + 1, currentYear)}</div>
                            </div>
                            <div className={"cardContent"}>
                                <div className={"addNote"}>
                                    +

                                </div>


                            </div>


                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={handlePrevMonth}>Poprzedni</button>
                    <button onClick={handleNextMonth}>Następny</button>
                </div>
            </> : null}

        </>
    );
};
export default Calendar;