import axios from 'axios';
import type { Note } from '../types/note';

// Налаштування екземпляра Axios
const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    // Змінна оточення має бути завантажена через Vite
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export const fetchNotes = async (
  page?: number,
  perPage?: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const response = await noteApi.get<FetchNotesResponse>('/notes', {
    params: { 
      page, 
      perPage, 
      search 
    },
  });
  return response.data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const response = await noteApi.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteApi.delete<Note>(`/notes/${id}`);
  return response.data;
};