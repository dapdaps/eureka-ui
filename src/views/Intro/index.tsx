import { memo } from "react";

import { StyledContainer } from "@/styled/styles";

import Banner from "./components/Banner";
import Fist from "./components/Fist";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Into from "./components/Into";
import MiniCard from "./components/MiniCard";
import Partners from "./components/Partners";
import RotateNetworks from "./components/RotateNetworks";
import Slogan from "./components/Slogan";
import Statistics from "./components/Statistics";
export default memo(function HomePage() {
  return (
    <StyledContainer style={{ background: "#000" }}>
      <Header />
      <Banner />
      <RotateNetworks />
      <Into />
      <MiniCard />
      <Statistics />
      <Partners />
      <Fist />
      <Slogan />
      <Footer />
    </StyledContainer>
  )
})