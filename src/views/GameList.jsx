import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GameAPI, { CURRENCY } from '../service';
import {
  setSearch,
  setPlatform,
  setSortBy,
  toggleSortDir,
  toggleControllerFilter,
  resetFilters,
} from '../game.centr/filtersSlice';

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (!cancelled) {
        setGames(GameAPI.all());
        setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = (id) => {
    setGames(GameAPI.delete(id));
  };

  const visibleGames = games
    .filter((g) =>
      g.title.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((g) => filters.platform === 'all' || g.platform === filters.platform)
    .filter((g) => !filters.onlyWithController || g.controller)
    .sort((a, b) => {
      const dir = filters.sortDir === 'asc' ? 1 : -1;
      if (filters.sortBy === 'price') return (a.price - b.price) * dir;
      if (filters.sortBy === 'title')
        return a.title.localeCompare(b.title) * dir;
      return (a.id - b.id) * dir;
    });

  if (loading) {
    return (
      <div className="view">
        <p className="loading">Загрузка каталога…</p>
      </div>
    );
  }

  return (
    <div className="view">
      <header className="view-header">
        <h1>Каталог игр</h1>
        <button
          type="button"
          className="btn primary"
          onClick={() => navigate('/add')}
        >
          + Добавить игру
        </button>
      </header>

      <div className="filters">
        <input
          type="text"
          className="filters__search"
          placeholder="Поиск по названию…"
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        <select
          className="filters__select"
          value={filters.platform}
          onChange={(e) => dispatch(setPlatform(e.target.value))}
        >
          <option value="all">Все платформы</option>
          <option value="PC">PC</option>
          <option value="PS5">PS5</option>
          <option value="Xbox">Xbox</option>
          <option value="Switch">Switch</option>
        </select>

        <select
          className="filters__select"
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="id">Сортировка: ID</option>
          <option value="title">Сортировка: Название</option>
          <option value="price">Сортировка: Цена</option>
        </select>

        <button
          type="button"
          className="btn"
          onClick={() => dispatch(toggleSortDir())}
          title="Переключить направление сортировки"
        >
          {filters.sortDir === 'asc' ? '↑ По возрастанию' : '↓ По убыванию'}
        </button>

        <label className="filters__checkbox">
          <input
            type="checkbox"
            checked={filters.onlyWithController}
            onChange={() => dispatch(toggleControllerFilter())}
          />
          Можно использовать контроллер
        </label>

        <button
          type="button"
          className="btn"
          onClick={() => dispatch(resetFilters())}
        >
          Сбросить
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Платформа</th>
            <th>Цена, {CURRENCY}</th>
            <th>Статус</th>
            <th>Контроллер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {visibleGames.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.title}</td>
              <td>{game.platform}</td>
              <td>
                {CURRENCY}
                {game.price.toFixed(2)}
              </td>
              <td>
                <span className={`status status-${statusKey(game.status)}`}>
                  {game.status}
                </span>
              </td>
              <td>
                {game.controller ? (
                  <span className="controller yes" title="Поддерживает геймпад">
                    Да
                  </span>
                ) : (
                  <span className="controller no" title="Только клавиатура и мышь">
                    Нет
                  </span>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => handleDelete(game.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          {visibleGames.length === 0 && (
            <tr>
              <td colSpan={7} className="empty">
                Ничего не найдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function statusKey(status) {
  if (status === 'Доступна') return 'available';
  if (status === 'Скоро') return 'soon';
  return 'unknown';
}

export default GameList;