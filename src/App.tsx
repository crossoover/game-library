import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { useTheme } from "./hooks/useTheme";
import { BrowserRouter } from "react-router";
import { MobileMenu } from "./components/MobileMenu";
import { Sidebar } from "./components/Sidebar";
import { BannerSlider } from "./components/BannerSlider";
import { Typography } from "./components/ui/Typography";

export const App = () => {
  const { themeConfig } = useTheme();

  return (
    <ThemeProvider theme={themeConfig}>
      <GlobalStyle />
      <BrowserRouter>
        <Wrapper>
          <Sidebar />
          <MobileMenu />
          <InnerWrap>
            <BannerSlider />
            <Content>
              <Typography variant="h1">asd</Typography>
            </Content>
          </InnerWrap>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${(props) => props.theme.colors.background.screen};
  display: flex;
  border: 1px solid red;
  width: 100%;
`;

const InnerWrap = styled.div`
  max-width: 1200px;
  border: 1px solid red;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1450px) {
    margin-left: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Content = styled.div`
  border: 1px solid red;
`;
