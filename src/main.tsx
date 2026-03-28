import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import 'modern-normalize'; // Обов'язкове скидання стилів
import App from './components/App/App';
import './index.css'; // Ваші глобальні стилі (шрифти, колір фону тощо)

// Створюємо екземпляр QueryClient для керування кешем запитів
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Опціонально: вимикає авто-запит при зміні вкладки
      retry: 1, // Кількість спроб переотримання даних при помилці
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
