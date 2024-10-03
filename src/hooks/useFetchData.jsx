import { useEffect, useState } from "react";

export function useFetchData(url, page) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    let cancel = false;
    async function fetchData() {
      try {
        setIsLoading(true);
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append("limit", 18);
          queryParam.append("skip", (page - 1) * 18);
          queryParam.append("sort", "createdAt:-1");
        }
        const response = await fetch(url + `?${queryParam}`);
        if (response.ok && !cancel) {
          const newData = await response.json();
          //fonction d'update pour ne pas passer recipes dans les dépendances afin
          // de ne pas avoir une boucle infinie
          setData((actualData) =>
            Array.isArray(newData)
              ? [...actualData, ...newData]
              : [...actualData, newData]
          );
        }
      } catch (e) {
        console.log(e);
        setError("Erreur");
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => (cancel = true);
  }, [url, page]);

  return [[data, setData], isLoading, error];
}
