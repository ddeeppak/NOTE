import { Note } from '../types/Note';

export function loadNotes(): Note[] {
  const savedNotes = localStorage.getItem('notes');
  return savedNotes
    ? JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }))
    : [];
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem('notes', JSON.stringify(notes));
}