"use client"

import { Product } from "@/interfaces/productInterface"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import Image from "next/image"
import { StarIcon } from "lucide-react"
import AddToCart from "../AddToCart/AddToCart"

function CategoryProducts({categoryId}: {categoryId: string}) {
    const [categoryName, setCategoryName] = useState("")
    const [allProducts, setAllProducts] = useState([])
    const [filteringProducts, setFilteringProducts] = useState([])

  async function getSingleCategory() {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
      const data = await response.json()
      setCategoryName(data.data.name)
  }

  async function getAllProducts() {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
      const data = await response.json()
      setAllProducts(data.data)
  }

  useEffect(() => {
    getSingleCategory()
    getAllProducts()
  }, [categoryId])

  useEffect(() => {
    if (!categoryName || allProducts.length === 0) return

    const filtered = allProducts.filter(
      (product: Product) => product.category.name === categoryName
    )

    setFilteringProducts(filtered)
  }, [categoryName, allProducts])

  return (
    <div className="py-12 px-[3vw] xl:px-[7vw]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Men's Fashion</h2>
        <p className="text-gray-600">Products in this category</p>
      </div>
      {
        filteringProducts.length > 0 
        ? 
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {
          filteringProducts.map((product: Product) => {
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
                <AddToCart productId={product.id}/>
              </Card>
            </div>
            )
          })
        }
      </div>
        :
        <div className="h-[60vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">{categoryName} Is Not Found</h2>
        </div>
      }

    </div>
  )
}

export default CategoryProducts