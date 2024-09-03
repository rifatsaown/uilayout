'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Bookmark, ShoppingCart } from 'lucide-react'

import { CardArr } from '@/components/common/constant'
import { motion } from 'framer-motion'
const arr = [
  {
    img: 'https://res.cloudinary.com/dzl9yxixg/image/upload/v1714415908/usama-akram-s-gYAbQToXk-unsplash_zdsntx.jpg',
    title: 'Nike Air1',
    color: '#202020',
  },
  {
    img: 'https://res.cloudinary.com/dzl9yxixg/image/upload/v1714372227/usama-akram-kP6knT7tjn4-unsplash_xm8rmu.jpg',
    title: 'Nike Air2',
    color: '#bffd6e',
  },
  {
    img: 'https://res.cloudinary.com/dzl9yxixg/image/upload/v1714415909/luis-felipe-lins-LG88A2XgIXY-unsplash_rdybsg.jpg',
    title: 'Nike Air3',
    color: '#ff946a',
  },
  {
    img: 'https://res.cloudinary.com/dzl9yxixg/image/upload/v1714415909/regis-hari-bouchard-ZjViL8qxihM-unsplash_hwrmgb.jpg',
    title: 'Nike Air4',
    color: '#07973e',
  },
]

function HomeProductCard() {
  const [selectedImage, setSelectedImage] = useState(arr[1].img)
  const [selectedColor, setSelectedColor] = useState(arr[1].color)
  const handleColorButtonClick = (img: string, color: string) => {
    setSelectedImage(img)
    setSelectedColor(color)
  }
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive((prevState) => !prevState)
  }

  return (
    <div className="flex items-center h-full ">
      <div
        // whileTap={{ scale: 0.9 }}
        className="w-full p-2 pt-0 mx-auto relative rounded-md  before:h-full before:w-full before:absolute before:top-0 before:left-0 dark:before:bg-gray-900 before:bg-white md:before:translate-y-6 before:translate-y-5 before:scale-90 before:rounded-md before:shadow-md after:content-[''] after:h-full after:w-full after:absolute after:top-0 after:left-0 dark:after:bg-gray-800 after:bg-white after:shadow-md md:after:translate-y-3 after:translate-y-2 after:z-[2] after:scale-[.93] after:rounded-md "
      >
        <div className="dark:bg-gray-900 bg-gray-100 rounded-md relative z-[4] shadow-lg">
          <div className="w-full lg:h-60 md:h-48 h-40 relative">
            <motion.button
              className="absolute top-3 right-1 px-4 z-20 text-2xl  text-white"
              onClick={handleClick}
              animate={{ scale: isActive ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 1000, damping: 10 }}
            >
              {isActive ? (
                <>
                  <Bookmark className="fill-white" />
                </>
              ) : (
                <>
                  <Bookmark />
                </>
              )}
            </motion.button>
            {arr.map((data, index) => (
              <Image
                src={data?.img}
                alt="shoes"
                width={1000}
                height={1000}
                className={`absolute lg:h-60 md:h-48 h-40 w-full rounded-t-md  object-cover  ${
                  selectedColor === data.color
                    ? 'z-10 transition-all duration-500'
                    : 'transition-all delay-500'
                }`}
                style={{
                  clipPath:
                    selectedColor === data.color
                      ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%) '
                      : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%) ',
                }}
              />
            ))}
          </div>
          <article className="dark:text-white text-black pt-2 p-4">
            <div className="flex justify-between">
              <h1 className="font-semibold lg:text-xl text-base">
                Nike Air Max
              </h1>
              <div className="flex gap-2 items-center">
                {arr.map((data, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorButtonClick(data.img, data.color)}
                    className={` relative w-6 h-6 border  rounded-full grid place-content-center transition-all ${
                      selectedColor === data.color
                        ? ' dark:border-white border-black'
                        : 'dark:border-gray-600 border-gray-200'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full inline-block"
                      style={{
                        backgroundColor: data.color,
                      }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between py-2 items-center">
              <span className="font-medium text-2xl dark:text-white text-black">
                $39
              </span>
              <button className="w-fit px-4 text-white flex justify-center items-center gap-2 bg-gradient-to-r dark:from-[#5862ad] dark:to-[#263381] from-[#3e5068] to-[#0c1970] py-3 rounded-md">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default HomeProductCard
