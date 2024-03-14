import React from "react";
import Image from "next/image";

export default function JinxCard({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center px-6">
      <div className="text-4xl py-8 font-bold">Jinx it!</div>
      <div className="my-4 py-4 px-8 font-normal text-2xl border-white border-dashed border-[1px] w-fit rounded-lg">
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "2",
          filter: "opacity(.2)",
        }}
      >
        {image && (
          <Image
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: 0.9,
            }}
            alt="drink"
            width={700}
            height={700}
          />
        )}
      </div>
    </div>
  );
}
