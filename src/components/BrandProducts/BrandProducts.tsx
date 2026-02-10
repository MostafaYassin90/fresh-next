"use client";

import { Product } from "@/interfaces/productInterface";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import AddToCart from "../AddToCart/AddToCart";

function BrandProducts({ brandId }: { brandId: string }) {
  const [brandName, setBrandName] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function getSingleBrand() {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    );
    const data = await response.json();
    setBrandName(data.data.name);
  }

  async function getAllProducts() {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products`,
    );
    const data = await response.json();
    setProducts(data.data);
  }

  useEffect(() => {
    getSingleBrand();
    getAllProducts();
  }, [brandId]);

  function handleFilteringProducts() {
    let productsClone = structuredClone(products);
    productsClone = productsClone.filter(
      (product: Product) => product.brand.name === brandName,
    );
    setFilteredProducts(productsClone);
  }

  useEffect(() => {
    if (!brandName || products.length == 0) {
      return;
    }
    handleFilteringProducts();
  }, [brandName, products]);

  return (
    <div className="py-12 px-[3vw] xl:px-[7vw]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Men's Fashion</h2>
        <p className="text-gray-600">Products in this category</p>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product: Product) => {
            return (
              <div key={product.id}>
                <Card className="pt-0 overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={200}
                      height={150}
                      className="w-full relative z-20 object-cover"
                    />
                    <CardHeader>
                      <CardDescription>{product.brand.name}</CardDescription>
                      <CardTitle className="line-clamp-1">
                        {product.title}
                      </CardTitle>
                      <CardDescription>{product.category.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                      <div className="flex">
                        <StarIcon className="fill-amber-500 text-amber-500 size-4" />
                        <StarIcon className="fill-amber-500 text-amber-500 size-4" />
                        <StarIcon className="fill-amber-500 text-amber-500 size-4" />
                        <StarIcon className="fill-amber-500 text-amber-500 size-4" />
                        <StarIcon className="fill-amber-500 text-amber-500 size-4" />
                      </div>
                      <p>{product.ratingsAverage}</p>
                    </CardContent>
                    <CardFooter>
                      <p>Price: {product.price} EGP</p>
                    </CardFooter>
                  </Link>
                  <AddToCart productId={product.id} />
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-[60vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">{brandName} Is Not Found</h2>
        </div>
      )}
    </div>
  );
}

export default BrandProducts;
