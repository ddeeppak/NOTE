import React, { useState, useEffect } from 'react';
import { Note } from '../types/Note';
import { Save, AlertCircle } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
}

export function NoteEditor({ note, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'editing' | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSaveStatus('saved');
    }
  }, [note]);

  const handleSave = () => {
    if (!note) return;
    onSave({
      ...note,
      title,
      content,
      updatedAt: new Date(),
    });
    setSaveStatus('saved');
  };

  const handleChange = (field: 'title' | 'content', value: string) => {
    if (field === 'title') setTitle(value);
    else setContent(value);
    setSaveStatus('editing');
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Select a note or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      <div className="border-b border-gray-200 p-6 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
        <input
          type="text"
          value={title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Note title"
          className="text-xl font-semibold text-gray-900 bg-transparent border-none focus:outline-none w-full"
        />
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {saveStatus === 'editing' ? 'Unsaved changes' : 'All changes saved'}
          </span>
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saved'}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
              saveStatus === 'editing'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => handleChange('content', e.target.value)}
        placeholder="Start writing your note..."
        className="flex-1 p-6 text-gray-700 bg-transparent border-none resize-none focus:outline-none"
      />
    </div>
  );
}