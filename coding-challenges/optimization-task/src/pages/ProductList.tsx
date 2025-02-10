import { useState, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { generateProducts } from "../utils/generateData";
import ProductCard from "../components/ProductCard";
import VirtualList from "../components/VirtualList";
import { Product } from "../types";

const ProductList = () => {
  const [filter, setFilter] = useState("");

  // 실제로는 API 호출을 해야하지만, 예제에서는 로컬 데이터 사용
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => generateProducts(1000),
  });

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <Container>
      <FilterInput
        type="text"
        placeholder="Filter products..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <VirtualList
        items={filteredProducts}
        height={800}
        itemHeight={200}
        renderItem={(product) => (
          <ProductCard key={product.id} product={product} />
        )}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export default ProductList;
