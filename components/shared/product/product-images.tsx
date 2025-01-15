'use client';

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: {images: string[]}) => {
    const [mainImgSrc, setMainImgSrc] = useState(images[0]);

  return (
    <div className="space-y-4">
        <Image src={mainImgSrc} width={300} height={300} alt='Product image' className="min-h-[300px] object-contain object-center" priority />
        <div className="flex gap-4">
            {images.map((img, index) => (
                <div 
                    className={ cn(
                        'border rounded p-2 flex-center cursor-pointer border-gray-300 hover:border-violet-600', 
                        mainImgSrc === img && 'border-violet-600'
                    )}
                    key={`${img}-${index}`}
                    onClick={() => setMainImgSrc(img)}
                >
                    <Image src={img} width={100} height={100} alt='Product image' />
                </div>
            ))}
        </div>
    </div>
  );
};

export default ProductImages;