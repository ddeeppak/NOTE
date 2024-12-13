import React from 'react';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { YearCalendar } from './components/Calendar/YearCalendar';
import { useNotes } from './hooks/useNotes';

export default function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 gradient-animate flex flex-col">
      <header className="bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text animate-float">
                Note Diary
              </h1>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  showCalendar 
                    ? 'bg-blue-100 text-blue-600 rotate-180' 
                    : 'hover:bg-gray-100'
                }`}
                title="Toggle Calendar"
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleCreateNote}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md flex items-center"
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
              <div className="border-t border-gray-200 transition-all duration-500 transform">
                <YearCalendar notes={notes} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}