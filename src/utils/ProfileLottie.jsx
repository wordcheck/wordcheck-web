import React from "react";
import Lottie from "react-lottie";
import { Container } from "../components/style/WordStyle";
import ProfileLottieData from "./profileLottieData.json";

const lottieOptions = {
  animationData: ProfileLottieData,
  loop: false,
  autoplay: true,
};
export default function ProfileLottie() {
  return (
    <Container style={{ justifyContent: "center" }}>
      <Lottie
        options={lottieOptions}
        style={{ width: "35vw", height: "35vh" }}
      />
    </Container>
  );
}
