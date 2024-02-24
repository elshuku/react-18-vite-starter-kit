import {Link, Outlet} from "react-router-dom";

export default () => {
  return <div className="">
    <header>
      <nav className="top-nav">
        <ul className="top-nav--ul">
          <li className="top-nav--ul--li"><Link className="nav-link" to={'/timer'}>Timer</Link></li>
          <li className="top-nav--ul--li"><Link className="nav-link" to={'/timezones'}>Timezones</Link></li>
        </ul>
      </nav>
    </header>
    <main className="min-h-96 p-6">
      <Outlet/>
    </main>
    <footer className="footer">
      <nav className="text-left">
        <span className="text-xs text-gray">Links:</span>
        <ul>
          <li className="footer-link"><a href="https://github.com/elshuku/react-18-vite-starter-kit/tree/main/src">Reference
            github</a></li>
        </ul>
      </nav>
    </footer>
  </div>
}