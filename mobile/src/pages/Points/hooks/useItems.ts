import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const useItems = (): Item[] => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get("/items").then(({ data }: { data: Item[] }) => {
      setItems(data);
    });
  }, []);

  return items;
};

export default useItems;
