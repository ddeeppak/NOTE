import React from 'react';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { NoteList } from './NoteList';
import { NoteEditor } from './NoteEditor';
import { YearCalendar } from './Calendar/YearCalendar';
import { useNotes } from '../hooks/useNotes';
import { ThemeToggle } from './ThemeToggle';

export default function NoteDiary() {
  const {
    notes,
    selectedNoteId,
    setSelectedNoteId,
    handleSaveNote,
    handleCreateNote,
  } = useNotes();
  const [showCalendar, setShowCalendar] = React.useState(false);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
                    dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                           dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                Note Diary
              </h1>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className={`p-2 rounded-full transition-colors ${
                  showCalendar 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Toggle Calendar"
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
            <button
              onClick={handleCreateNote}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                       dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg 
                       hover:from-blue-700 hover:to-indigo-700 
                       dark:hover:from-blue-600 dark:hover:to-indigo-600 
                       transition-all transform hover:scale-105 shadow-md 
                       flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              New Note
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-1 min-h-0">
          <NoteList
            notes={notes}
            selectedNoteId={selectedNoteId}
            onNoteSelect={(note) => setSelectedNoteId(note.id)}
          />
          <div className="flex-1 flex flex-col min-h-0">
            <NoteEditor note={selectedNote} onSave={handleSaveNote} />
            {showCalendar && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                <YearCalendar notes={notes} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}