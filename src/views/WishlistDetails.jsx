import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectWishlistById, selectGamesInWishlist } from '../game.centr/selectors';
import { addGameToWishlist, removeGameFromWishlist } from '../game.centr/wishlistItemsSlice';
import GameAPI, { CURRENCY } from '../service';

function WishlistDetails() {
  const { id } = useParams();
  const wishlistId = Number(id);
  const dispatch = useDispatch();
  
  const currentList = useSelector((state) => selectWishlistById(state, wishlistId));
  const gameIdsInList = useSelector((state) => selectGamesInWishlist(state, wishlistId));
  
  const allGames = GameAPI.all();

  if (!currentList) return <p className="loading">Список не найден</p>;

  const toggleGame = (gameId) => {
    if (gameIdsInList.includes(gameId)) {
      dispatch(removeGameFromWishlist({ wishlistId, gameId }));
    } else {
      dispatch(addGameToWishlist({ wishlistId, gameId }));
    }
  };

  return (
    <div className="view">
      <header className="view-header">
        <div>
          <h1>Список: {currentList.title}</h1>
          <Link to="/wishlists" style={{ fontSize: '14px', color: 'var(--text)' }}>
            ← Назад к спискам
          </Link>
        </div>
      </header>

      <table className="table" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название игры</th>
            <th>Цена, {CURRENCY}</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {allGames.map((game) => {
            const inList = gameIdsInList.includes(game.id);
            return (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.title}</td>
                <td>{CURRENCY}{game.price.toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    className={inList ? 'btn primary' : 'btn'}
                    onClick={() => toggleGame(game.id)}
                  >
                    {inList ? 'Убрать из списка' : 'Добавить в список'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WishlistDetails;
