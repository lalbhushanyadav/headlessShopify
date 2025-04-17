import React, { useEffect, useState } from "react";
import Carousal from "../../../shared/components/Carousal";

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const resolvedImages = await Promise.all(
        Array.from({ length: 5 }, async (_, i) => {
          const res = await fetch(`https://picsum.photos/1200/600?random=${i}`);
          return res.url;
        })
      );
      setImages(resolvedImages);
    };

    fetchImages();
  }, []);

  return (
    <div className="homepage">
      <Carousal images={images} />
    </div>
  );
}

export default Home;
