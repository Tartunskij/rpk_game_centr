import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectWishlists } from '../game.centr/selectors';
import { removeWishlist } from '../game.centr/wishlistsSlice';
import { removeAllGamesFromWishlist } from '../game.centr/wishlistItemsSlice';

function WishlistList() {
  const wishlists = useSelector(selectWishlists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(removeAllGamesFromWishlist(id));
    dispatch(removeWishlist(id));
  };

  return (
    <div className="view">
      <header className="view-header">
        <h1>Списки желаемого</h1>
        <button
          type="button"
          className="btn primary"
          onClick={() => navigate('/add-wishlist')}
        >
          + Новый список
        </button>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название списка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {wishlists.map((list) => (
            <tr key={list.id}>
              <td>{list.id}</td>
              <td>
                <Link to={`/wishlists/${list.id}`} className="link">
                  {list.title}
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => handleDelete(list.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          {wishlists.length === 0 && (
            <tr>
              <td colSpan={3} className="empty">
                Списков пока нет
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WishlistList;