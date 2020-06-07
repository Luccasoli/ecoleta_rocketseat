import { useEffect, useState } from "react";
import api from "../../../services/api";

export interface ApiResponse {
  point: Point;
  items: Item[];
}

export interface Point {
  id: number;
  image: string;
  image_url: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
}

export interface Item {
  id: number;
  image: string;
  title: string;
  point_id: number;
  item_id: number;
}

const usePoint = (id: number): ApiResponse => {
  const [point, setPoint] = useState<ApiResponse>({} as ApiResponse);

  useEffect(() => {
    api.get(`/points/${id}`).then(({ data }: { data: ApiResponse }) => {
      setPoint(data);
    });
  }, []);

  return { point: point.point, items: point.items };
};

export default usePoint;
