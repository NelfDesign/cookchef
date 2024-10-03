import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/homePage/HomePage";
import styles from "./App.module.scss";
import { useState } from "react";
import Admin from "./pages/Admin/Admin";
// import { seedRecipes } from "./data/seeds";

// seedRecipes();

function App() {
  const [page, setPage] = useState("homePage");
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header setPage={setPage} />
      {page === "homePage" && <HomePage />}
     {page === "admin" && <Admin />} 
      <Footer />
    </div>
  );
}

export default App;
