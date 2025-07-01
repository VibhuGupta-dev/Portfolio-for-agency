import React, { useState, useEffect } from 'react';
import MetallicPaint, { parseLogoImage } from '../metalicpaint';
import logo from '../assets/cop.svg';

function Portfolio() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.svg", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading SVG mask:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {imageData && (
        <MetallicPaint
          imageData={imageData}
          params={{
            edge: 2,
            patternBlur: 0.005,
            patternScale: 2,
            refraction: 0.015,
            speed: 0.3,
            liquid: 0.07,
          }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-500 text-center drop-shadow-[0_0_20px_#00ffff]">
          Project Coming Soon
        </h1>
      </div>
    </div>
  );
}

export default Portfolio;
