import { useContext, useState } from "react";
import styles from "./HomePage.module.scss";
import Recipe from "./components/Recipe/Recipe";
import Loading from "../../components/Loading/Loading";
import { ApiContext } from "../../Context/ApiContext";
import Search from "./components/Search/Search";
import { useFetchData } from "../../hooks/useFetchData";

function HomePage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const BASE_URL = useContext(ApiContext);

  const [[recipies, setRecipies], isLoading] = useFetchData(BASE_URL, page);
  function updateRecipies(updatedRecipe) {
    setRecipies(
      recipies.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  }

  function deleteRecipe(_id) {
    setRecipies(recipies.filter((r) => r._id !== _id));
  }

  function handleClickLoadMoreRecipes() {
    setPage(page + 1);
  }

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">
        Découvrez nos nouvelles recettes{" "}
        <small className={styles.small}>{recipies.length}</small>
      </h1>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !recipies.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipies
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  toggleLikerecipe={updateRecipies}
                  deleteRecipe={deleteRecipe}
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
