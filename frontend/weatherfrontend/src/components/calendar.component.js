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
    const [notes, setNotes] = useState([])

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
            const urlNotes = `http://localhost:8080/api/notes`
            const options = {
                method: 'GET'
            }
            let response = await fetch(url, options)
            let responseNotes = await fetch(urlNotes, options)
            let actualWeather = await response.json()
            let actualNotes = await responseNotes.json()
            setWeather(actualWeather)
            setNotes(actualNotes)
            setHasLoaded(true)

        }

        fetchData();


    }, []);

    const getWeatherForDay = (day, month, year) => {
        const allDays = weather.forecast.forecastday;
        const dateW = `${year}-${month}-${day}`;
        const found = allDays.find(w => {
            const [wYear, wMonth, wDay] = w.date.split('-').map(Number)
            return wDay === day && wMonth === month && wYear === year
        })
        return found ? "max " + found.day.maxtemp_c + " °C" : null
    }


    const addNote = async (event,day,month,year) => {
        let dateNote = year + "-" + month + "-" + day
        let noteContent = "test"
        const newNote = {
            dateNote,
            noteContent,
        };
        console.log(newNote)
        try{
            const url = 'http://localhost:8080/api/note'
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(newNote)
            };
            const response = await fetch(url, requestOptions)
            if (response.ok) {
                const newNoteServer = await response.json();
                setNotes([...notes, newNoteServer]);
            }


        }

        catch (error){
            console.error(error)
        }

    };

    const removeNote = async (noteId) => {

        try{
            const url = 'http://localhost:8080/api/note/' + noteId
            const requestOptions = {
                method: 'DELETE',


            };
            const response = await fetch(url, requestOptions)
            if (response.ok) {
                const newNotes = notes.filter(note => note.noteId !== noteId);
                setNotes(newNotes);
            }

        }


        catch (error){
            console.error(error)
        }

    }
    const getNotesForDay = (day, month, year) => {
        const dateStr = `${year}-${month}-${day}`;
        const notesForDay = notes.filter(note => note.dateNote === dateStr);
        return notesForDay.map((note, index) => <div className={"oneNote"}><div style={{width:"90%"}} key={index}>{note.noteContent}</div><div className={"buttonStyle"} style={{width:"10%",textAlign:"right"}}><button onClick={()=>{removeNote(note.noteId)}}>x</button></div></div>);
    };






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
                            data-year={currentYear}
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
                                <div className={"addNote"} onClick={(e) => addNote(e, day, currentMonth + 1, currentYear)}>
                                    +

                                </div>
                                <div className={"notes"}>


                                    {getNotesForDay(day, currentMonth + 1, currentYear)}</div>


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