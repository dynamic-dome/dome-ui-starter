import { Stack } from "@dome/ui";
import { Link, NavLink, Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="duett-app">
      <header className="duett-header">
        <Link to="/" className="duett-brand">
          dream-team · <span className="duett-brand-accent">duett</span>
        </Link>
        <nav className="duett-nav">
          <NavLink to="/" end className={navClass}>
            Runs
          </NavLink>
          <NavLink to="/spend" className={navClass}>
            Spend
          </NavLink>
          <NavLink to="/sycophancy" className={navClass}>
            Sycophancy
          </NavLink>
        </nav>
      </header>
      <main className="duett-main">
        <Stack gap="md">
          <Outlet />
        </Stack>
      </main>
    </div>
  );
}

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? "duett-nav-link is-active" : "duett-nav-link";
}
