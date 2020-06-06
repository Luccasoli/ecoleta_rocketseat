import axios from "axios";
import { useEffect, useState } from "react";
import { Cidade } from "./shared/interfaces";

const useCities = (uf: string): Cidade[] => {
  const [cities, setCities] = useState<Cidade[]>([]);
  useEffect(() => {
    if (uf)
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
        )
        .then(({ data }: { data: Cidade[] }) => {
          setCities(data);
        });
  }, [uf]);

  return cities;
};

export default useCities;
