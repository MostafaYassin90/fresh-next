import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/interfaces/productInterface";
import { StarIcon } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddToCart from "@/components/AddToCart/AddToCart";

async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const response = await fetch(
    `${process.env.API_URL}/products/${productId}`,
  );
  const { data: product }: { data: Product } = await response.json();

  return (
    <div className="py-16">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <div className="col-span-1">
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {product.images.map((img, index) => {
                  return (
                    <CarouselItem key={index}>
                      <Image
                        src={img}
                        alt={product.title}
                        width={200}
                        height={150}
                        className="w-full"
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="col-span-2 space-y-5">
            <CardHeader>
              <CardDescription>{product.brand.name}</CardDescription>
              <CardTitle className="line-clamp-1">{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
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
            <AddToCart productId={product.id}/>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductDetails;
