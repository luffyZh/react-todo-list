import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <main>
    <div className='todo-bg' />
    <App />
  </main>,
);
