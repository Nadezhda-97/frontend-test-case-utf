export function Header({ user, isLoading}) {
  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">
        {isLoading ? (
          <span>Загрузка...</span>
        ) : (
          <span>Привет, {user.name}!</span>
        )}
      </div>
    </header>
  )
}