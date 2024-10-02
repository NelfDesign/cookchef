import { useContext, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import Recipe from "./components/Recipe";
import Loading from "../../components/Loading/Loading";
import { ApiContext } from "../../Context/ApiContext";

function HomePage() {
  const [recipes, setRecipies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const BASE_URL = useContext(ApiContext);

  useEffect(() => {
    let cancel = false;
    async function fetchRecipies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}?skip=${(page - 1) * 18}&limit=18`
        );
        if (response.ok && !cancel) {
          const newRecipies = await response.json();
          //fonction d'update pour ne pas passer recipes dans les dépendances afin
          // de ne pas avoir une boucle infinie
          setRecipies((actualRecipes) =>
            Array.isArray(newRecipies)
              ? [...actualRecipes, ...newRecipies]
              : [...actualRecipes, newRecipies]
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRecipies();
    return () => (cancel = true);
  }, [BASE_URL, page]);

  function updateRecipies(updatedRecipe) {
    setRecipies(
      recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  }

  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

  function handleClickLoadMoreRecipes() {
    setPage(page + 1);
  }

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">
        Découvrez nos nouvelles recettes{" "}
        <small className={styles.small}>{recipes.length}</small>
      </h1>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
        <div
          className={`d-flex flex-row justify-content-center align-items-center my-30 ${styles.searchBar}`}
        >
          <i className="fa-solid fa-magnifying-glass mr-15"></i>
          <input
            onInput={handleInput}
            className="flex-fill"
            type="text"
            placeholder="Rechercher"
          />
        </div>
        {isLoading && !recipes.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  toggleLikerecipe={updateRecipies}
                />
              ))}
          </div>
        )}
        <div className="d-flex flex-row justify-content-center align-items-center p-20">
          <button
            onClick={handleClickLoadMoreRecipes}
            className="btn btn-primary"
          >
            Charger plus de recettes
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
