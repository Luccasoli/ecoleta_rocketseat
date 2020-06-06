import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Point {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

const usePoints = ({
  city,
  uf,
  items,
}: {
  city?: string;
  uf?: string;
  items?: number[];
} = {}): Point[] => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    api
      .get("/points", { params: { city, uf, items } })
      .then(({ data }: { data: Point[] }) => {
        setPoints(data);
      });
  }, [city, uf, items]);

  return points;
};

export default usePoints;
