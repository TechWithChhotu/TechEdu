import { TypeAnimation } from "react-type-animation";

const Typewriter = ({ fontSize = "3rem" }) => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Practical",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "Affordable",
        1000,
        "Easy Way",
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize, display: "inline-block" }}
      repeat={Infinity}
    />
  );
};

export default Typewriter;
