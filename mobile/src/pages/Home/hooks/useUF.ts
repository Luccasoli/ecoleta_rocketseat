import axios from "axios";
import { useEffect, useState } from "react";
import { Uf } from "./shared/interfaces";

const useUFs = (): Uf[] => {
  const [UFs, setUFs] = useState<Uf[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then(({ data }: { data: Uf[] }) => {
        setUFs(data);
      });
  }, []);

  return UFs;
};

export default useUFs;
