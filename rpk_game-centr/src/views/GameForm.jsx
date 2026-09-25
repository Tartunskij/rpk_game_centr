import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GameAPI, { CURRENCY } from '../service';

function GameForm() {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Доступна');
  const [controller, setController] = useState(false);
  const titleInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;
    GameAPI.add({
      title: title.trim(),
      platform,
      price: Number(price),
      status,
      controller,
    });
    navigate('/');
  };

  return (
    <div className="view">
      <h1>Новая игра</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Название
          <input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например, GTA VI"
          />
        </label>

        <label>
          Платформа
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option>PC</option>
            <option>PS5</option>
            <option>Xbox</option>
            <option>Switch</option>
          </select>
        </label>

        <label>
          Цена, {CURRENCY}
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="29.99"
          />
        </label>

        <label>
          Статус
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Доступна</option>
            <option>Скоро</option>
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={controller}
            onChange={(e) => setController(e.target.checked)}
          />
          Поддерживает контроллер
        </label>

        <div className="form-actions">
          <button type="button" className="btn" onClick={() => navigate('/')}>
            Отмена
          </button>
          <button type="submit" className="btn primary">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameForm;