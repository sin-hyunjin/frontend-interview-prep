import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface VirtualListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T) => React.ReactNode;
}

function VirtualList<T>({
  items,
  height,
  itemHeight,
  renderItem,
}: VirtualListProps<T>) {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItems = Math.ceil(height / itemHeight) + 1;
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const index = Math.floor(scrollTop / itemHeight);
        setStartIndex(index);
      }
    };

    containerRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      containerRef.current?.removeEventListener("scroll", handleScroll);
  }, [itemHeight]);

  const visibleItemsList = items.slice(startIndex, startIndex + visibleItems);

  return (
    <Container ref={containerRef} style={{ height }}>
      <InnerContainer style={{ height: totalHeight }}>
        <ItemsWrapper style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItemsList.map(renderItem)}
        </ItemsWrapper>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  overflow-y: auto;
  position: relative;
`;

const InnerContainer = styled.div`
  position: relative;
`;

const ItemsWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

export default VirtualList;
