import React, { useState, useEffect, memo } from "react";
import { Galleria } from "primereact/galleria";

const imagesArr = [
  {
    itemImageSrc: "product-1.png",
    thumbnailImageSrc: "product-1.png",
    alt: "image 1",
  },
  {
    itemImageSrc: "thumbnail.png",
    thumbnailImageSrc: "thumbnail.png",
    alt: "image 2",
  },
  {
    itemImageSrc: "thumbnail2.png",
    thumbnailImageSrc: "thumbnail2.png",
    alt: "image 3",
  },
  {
    itemImageSrc: "thumbnail2.png",
    thumbnailImageSrc: "thumbnail2.png",
    alt: "image 3",
  },
  {
    itemImageSrc: "thumbnail2.png",
    thumbnailImageSrc: "thumbnail2.png",
    alt: "image 3",
  },
  {
    itemImageSrc: "thumbnail2.png",
    thumbnailImageSrc: "thumbnail2.png",
    alt: "image 3",
  },
  {
    itemImageSrc: "thumbnail2.png",
    thumbnailImageSrc: "thumbnail2.png",
    alt: "image 3",
  },
  {
    itemImageSrc: "thumbnail2.png",
    thumbnailImageSrc: "thumbnail2.png",
    alt: "image 3",
  },
];

function Slider() {
  const [images, setImages] = useState(imagesArr);
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const responsiveOptions2 = [
    {
      breakpoint: "768px",
      numVisible: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item) => {
    return (
      <picture>
        <img
          src={`/images/${item.itemImageSrc}`}
          onError={(e) => (e.target.src = `/images/${item.itemImageSrc}`)}
          alt={item.alt}
          style={{ width: "100%", display: "block" }}
        />
      </picture>
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <picture
        style={{
          display: "block",
          maxWidth: "100px",
          maxHeight: "100px",
          objectFit: "contain",
        }}
      >
        <img
          src={`/images/${item.thumbnailImageSrc}`}
          onError={(e) => (e.target.src = `/images/${item.thumbnailImageSrc}`)}
          alt={item.alt}
          style={{ width: "100%", display: "block" }}
        />
      </picture>
    );
  };

  return (
    <div className="card">
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions2}
        numVisible={4}
        thumbnailsPosition="left"
        style={{ maxWidth: "640px" }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}

export default Slider;
