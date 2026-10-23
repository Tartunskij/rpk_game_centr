import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addWishlist } from '../game.centr/wishlistsSlice';

function WishlistForm() {
  const [title, setTitle] = useState('');
  const titleInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    dispatch(addWishlist({ title: title.trim() }));
    navigate('/wishlists');
  };

  return (
    <div className="view">
      <h1>Новый список</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Название списка
          <input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например, Хочу на ДР"
          />
        </label>

        <div className="form-actions">
          <button type="button" className="btn" onClick={() => navigate('/wishlists')}>
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

export default WishlistForm;