import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const useGuide = (productId) => {
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuidesByProvince = async () => {
      setLoading(true);
      try {
        const productResponse = await axiosInstance.get(
          `/products/${productId}`
        );
        const product = productResponse.data;

        if (product && product.province) {
          const productProvince = normalizeProvince(product.province);
          const guidesResponse = await axiosInstance.get("/guides");
          const guidesData = guidesResponse.data;

          const filtered = guidesData.filter(
            (guide) => normalizeProvince(guide.province) === productProvince
          );
          setFilteredGuides(filtered);
        } else {
          setFilteredGuides([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching guides:", err);
        setError(err);
        setLoading(false);
      }
    };

    if (productId) {
      fetchGuidesByProvince();
    } else {
      setFilteredGuides([]);
    }
  }, [productId]);

  const normalizeProvince = (province) => {
    return province
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  return { filteredGuides, loading, error };
};

export default useGuide;
