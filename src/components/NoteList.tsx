import React from 'react';
import { Note } from '../types/Note';
import { Calendar, Clock, FileText } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (note: Note) => void;
}

export function NoteList({ notes, selectedNoteId, onNoteSelect }: NoteListProps) {
  return (
    <div className="w-80 bg-white/80 backdrop-blur-md shadow-lg rounded-r-2xl overflow-hidden flex flex-col transition-all duration-300">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600 animate-float" />
          <h2 className="text-lg font-semibold text-gray-800">My Notes</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">{notes.length} notes</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notes.map((note, index) => (
              <div
                key={note.id}
                className={`note-card p-4 cursor-pointer ${
                  selectedNoteId === note.id
                    ? 'bg-blue-50 border-l-4 border-blue-600'
                    : 'border-l-4 border-transparent hover:bg-blue-50/50'
                }`}
                onClick={() => onNoteSelect(note)}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {note.title || 'Untitled Note'}
                </h3>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{note.content}</p>
                <div className="mt-2 flex items-center text-xs text-gray-400 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(note.updatedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}