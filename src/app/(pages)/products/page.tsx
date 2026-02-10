import { ProductsResponse } from "@/interfaces/productInterface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";


async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
  );
  const data: ProductsResponse = await response.json();

  return (
    <div className="py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {data?.data?.map((product) => {
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
          );
        })}
      </div>
    </div>
  );
}

export default Products;
