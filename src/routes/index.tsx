import { BrowserRouter, Routes, Route } from "react-router-dom";
import pages from "./pages";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
          {pages.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
  )
}