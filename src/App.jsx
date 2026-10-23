import { Routes, Route, NavLink } from 'react-router-dom';
import GameList from './views/GameList';
import GameForm from './views/GameForm';
import WishlistList from './views/WishlistList';
import WishlistForm from './views/WishlistForm';
import WishlistDetails from './views/WishlistDetails';
import { useTheme } from './useTheme';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme(); // <-- Тема

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">Game Store</h1>
          <p className="app-subtitle">Каталог игр и управление товарами</p>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? 'Светлая' : 'Тёмная'}
        </button>
      </header>

      <nav className="nav">
        <NavLink to="/" end>Каталог</NavLink>
        <NavLink to="/add">Добавить игру</NavLink>
        <NavLink to="/wishlists">Списки желаемого</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/add" element={<GameForm />} />
        <Route path="/wishlists" element={<WishlistList />} />
        <Route path="/add-wishlist" element={<WishlistForm />} />
        <Route path="/wishlists/:id" element={<WishlistDetails />} />
      </Routes>
    </div>
  );
}

export default App;