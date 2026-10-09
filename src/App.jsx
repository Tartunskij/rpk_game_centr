import { Routes, Route, NavLink } from 'react-router-dom';
import GameList from './views/GameList';
import GameForm from './views/GameForm';
import { useTheme } from './useTheme';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">Game Store</h1>
          <p className="app-subtitle">Каталог игр и управление товарами</p>
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          title="Переключить тему"
        >
          {theme === 'dark' ? 'Светлая' : 'Тёмная'}
        </button>
      </header>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Каталог
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>
          Добавить игру
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/add" element={<GameForm />} />
        <Route path="*" element={<GameList />} />
      </Routes>
    </div>
  );
}

export default App;