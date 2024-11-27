"use client";

import { IMeme } from "@/database/meme.model";
import { CircleChevronLeft, CircleChevronRight, CircleX } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const PopUpCard = ({ result }: any) => {
  console.log(result.slice(0, 10), "resultertyuio");

  const [selectedMeme, setSelectedMeme] = useState<IMeme | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Function to open the modal with the clicked meme
  const openModal = (meme: IMeme, index: number) => {
    setSelectedMeme(meme);
    setCurrentIndex(index);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedMeme(null);
    setCurrentIndex(null);
  };

  // Function to go to the next meme
  const goToNextMeme = () => {
    if (result && currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % result.length; // Loop back to the start
      setSelectedMeme(result[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  // Function to go to the previous meme
  const goToPreviousMeme = () => {
    if (result && currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + result.length) % result.length; // Loop to the end if at the start
      setSelectedMeme(result[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <>
      {/* Meme grid */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {result?.map((meme: IMeme, index: number) => (
          <div
            key={meme.id}
            onClick={() => openModal(meme, index)}
            className="cursor-pointer"
          >
            <Image
              src={meme.url}
              alt={meme.name}
              width={500}
              height={500}
              className="max-h-[350px] max-w-full rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Modal for the selected meme */}
      {selectedMeme && currentIndex !== null && (
        <div
          className="fixed  inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-xl bg-primary-500 p-0.5"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
          >
            <button
              className="text-dark100_light900 absolute right-2 top-2 text-xl font-bold"
              onClick={closeModal}
            >
              <CircleX className="text-red-500" />
            </button>

            {/* Navigation buttons for next and previous */}
            <button
              onClick={goToPreviousMeme}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xl font-bold text-white"
            >
              <CircleChevronLeft className="size-10 md:text-primary-500" />
            </button>
            <button
              onClick={goToNextMeme}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-xl font-bold text-white"
            >
              <CircleChevronRight className="size-10 md:text-primary-500" />
            </button>

            <Image
              src={selectedMeme.url}
              alt={selectedMeme.name}
              width={1800}
              height={1800}
              className="max-h-[80vh] max-w-full overflow-hidden rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpCard;
