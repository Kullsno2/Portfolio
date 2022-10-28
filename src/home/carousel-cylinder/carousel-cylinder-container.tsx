import "./carousel-cylinder.css";

const CarouselCylinder = ({ top, left, component }: any) => {
  console.log("CarouselCylinder");
  return (
    <div className="tank" style={{ marginLeft: "-25%" }}>
      <div className="bottom"></div>
      <div className="middle"></div>
      <div className="top"></div>
    </div>
  );
};

export default CarouselCylinder;
