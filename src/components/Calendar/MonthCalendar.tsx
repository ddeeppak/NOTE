import React from 'react';
import { Note } from '../../types/Note';
import { getMonthDays, isSameDay } from '../../utils/dateUtils';

interface MonthCalendarProps {
  year: number;
  month: number;
  notes: Note[];
}

export function MonthCalendar({ year, month, notes }: MonthCalendarProps) {
  const days = getMonthDays(year, month);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{monthName}</h3>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm text-gray-500 py-1 font-medium">
            {day}
          </div>
        ))}
        {Array.from({ length: days[0].getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        {days.map(date => {
          const dayNotes = notes.filter(note => isSameDay(new Date(note.createdAt), date));
          const isToday = isSameDay(date, new Date());
          return (
            <div
              key={date.toISOString()}
              className={`h-10 flex flex-col items-center justify-center rounded-lg relative hover:bg-blue-50 transition-colors cursor-pointer ${
                isToday ? 'bg-blue-50' : ''
              }`}
            >
              <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
                {date.getDate()}
              </span>
              {dayNotes.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {dayNotes.length}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}