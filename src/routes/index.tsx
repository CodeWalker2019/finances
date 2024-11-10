import { HashRouter, Routes, Route } from "react-router-dom";
import pages from "./pages";

export default function Router() {
  return (
    <HashRouter>
        <Routes>
          {pages.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </HashRouter>
  )
}