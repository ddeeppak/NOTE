import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Note } from '../../types/Note';
import { MonthCalendar } from './MonthCalendar';

interface YearCalendarProps {
  notes: Note[];
}

export function YearCalendar({ notes }: YearCalendarProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [visibleMonths, setVisibleMonths] = useState(3);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-lg shadow-inner">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentYear(year => year - 1)}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{currentYear}</h2>
            <button
              onClick={() => setCurrentYear(year => year + 1)}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <select
            value={visibleMonths}
            onChange={(e) => setVisibleMonths(Number(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">Full Year</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: visibleMonths }).map((_, index) => (
            <MonthCalendar
              key={index}
              year={currentYear}
              month={index}
              notes={notes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}