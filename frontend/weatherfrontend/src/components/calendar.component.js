import React, { useState } from 'react';
import "./styles.scss"

const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

const getDayName = (day, month, year) => {
    const days = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
    const date = new Date(year, month, day);
    return days[date.getDay()];
};

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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

    return (
        <>
            <div><h2>{months[currentMonth]}</h2></div>
        <div className={"calendar"}>
            {daysOfMonth.map((day, index) => (
                <div
                    key={index}
                    className="dayCard"
                    data-day={day}
                    data-month={currentMonth}
                    onClick={handleDayClick}
                >
                    {day}, {getDayName(day, currentMonth, currentYear)}
                </div>
            ))}
        </div>
            <div><button onClick={handlePrevMonth}>Poprzedni</button>
                <button onClick={handleNextMonth}>Następny</button></div>
        </>
    );
};
export default Calendar;