import { useEffect, useState } from 'react';
import './Layout.css';

export const Layout = ({ Sidebar, children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnNavigate = () => setOpen(false);
    window.addEventListener('popstate', closeOnNavigate);
    return () => window.removeEventListener('popstate', closeOnNavigate);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <button
          className="burger"
          aria-label="メニューを開く"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
        <h1 className="title">Menu</h1>
      </header>

      <aside className="sidebar-desktop">
        <Sidebar />
      </aside>

      <main className="content">{children}</main>

      <div
        id="mobile-drawer"
        className={`drawer ${open ? 'drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="drawer__panel">
          <div className="drawer__header">
            Todos
            <button
              className="drawer__close"
              aria-label="メニューを閉じる"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="drawer__body">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
        <div className="drawer__overlay" onClick={() => setOpen(false)} />
      </div>
    </div>
  );
};
