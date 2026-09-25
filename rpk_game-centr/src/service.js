const GameAPI = {
  games: [
    { id: 1, title: "Cyberpunk 2077", platform: "PC", price: 29.99, status: "Доступна", controller: true },
    { id: 2, title: "God of War Ragnarök", platform: "PS5", price: 49.99, status: "Доступна", controller: true },
    { id: 3, title: "Elden Ring", platform: "PC", price: 59.99, status: "Скоро", controller: true },
    { id: 4, title: "The Last of Us Part II", platform: "PS5", price: 39.99, status: "Доступна", controller: true },
    { id: 5, title: "Forza Horizon 5", platform: "Xbox", price: 29.99, status: "Скоро", controller: true },
    { id: 6, title: "Baldur's Gate 3", platform: "PC", price: 29.99, status: "Доступна", controller: false },
    { id: 7, title: "Zelda: Tears of the Kingdom", platform: "Switch", price: 69.99, status: "Доступна", controller: true },
  ],
  all: function () {
    return this.games;
  },
  get: function (id) {
    return this.games.find((g) => g.id === id);
  },
  delete: function (id) {
    this.games = this.games.filter((g) => g.id !== id);
    return true;
  },
  add: function (game) {
    if (!game.id) {
      const maxId = this.games.reduce(
        (prev, current) => (prev.id > current.id ? prev : current),
        { id: 0 }
      ).id;
      game = { ...game, id: maxId + 1 };
    }
    this.games = [...this.games, game];
    return game;
  },
  update: function (game) {
    const index = this.games.findIndex((g) => g.id === game.id);
    if (index !== -1) this.games[index] = game;
    return game;
  },
};

export const CURRENCY = '$';

export default GameAPI;