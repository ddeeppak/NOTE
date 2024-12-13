import { useState, useCallback } from 'react';
import { Note } from '../types/Note';
import { loadNotes, saveNotes } from '../utils/storage';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleSaveNote = useCallback((updatedNote: Note) => {
    setNotes(currentNotes => {
      const updatedNotes = currentNotes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      );
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  }, []);

  const handleCreateNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes(currentNotes => {
      const updatedNotes = [newNote, ...currentNotes];
      saveNotes(updatedNotes);
      return updatedNotes;
    });
    setSelectedNoteId(newNote.id);
  }, []);

  return {
    notes,
    selectedNoteId,
    setSelectedNoteId,
    handleSaveNote,
    handleCreateNote,
  };
}