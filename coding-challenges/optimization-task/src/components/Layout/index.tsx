import styled from "styled-components";
import Header from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export default Layout;
