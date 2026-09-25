import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameAPI, { CURRENCY } from '../service';

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    GameAPI.delete(id);
    setGames(GameAPI.all());
  };

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
</header>

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
          {games.map((game) => (
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
          {games.length === 0 && (
            <tr>
              <td colSpan={7} className="empty">
                Каталог пуст
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