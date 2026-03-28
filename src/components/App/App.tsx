import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, 12, search),
    placeholderData: keepPreviousData,
  });

  // const createMutation = useMutation({
  //   mutationFn: createNote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['notes'] });
  //     setIsModalOpen(false);
  //   },
  // });

  // const deleteMutation = useMutation({
  //   mutationFn: deleteNote,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  // });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={(e) => debouncedSearch(e.target.value)} />
        {data && data.totalPages > 1 && (
          <Pagination 
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={(nextPage) => setPage(nextPage)}
 
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      
      {data && data.notes.length > 0 && (
  <NoteList notes={data.notes} />
)}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;