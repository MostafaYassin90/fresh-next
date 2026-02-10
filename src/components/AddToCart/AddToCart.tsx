"use client";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import { CartRes } from "@/interfaces/CartInterfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCartAction } from "@/actions/addToCart.action";
import { useRouter } from "next/navigation";
import { addToWishListAction } from "@/actions/addToWishlistAction";

function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter()

  async function addToCart(productId: string) {
    try {
      setisLoading(true);
      const data: CartRes = await addToCartAction(productId)
      if (data == null) {
        router.push("/login") 
      }
      toast.success(data.message + "")
         dispatchEvent(new CustomEvent('cartUpdate', {detail: data.numOfCartItems}))
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  }

  async function addToWishList(productId: string) {
    const data = await addToWishListAction(productId);
    if (data == null) {
        router.push("/login") 
      }
      toast.success(data.message + "")
  }


  return (
    <>
      <CardFooter className="flex items-center gap-2">
        <Button
          disabled={isLoading}
          onClick={() => {
            addToCart(productId);
          }}
          className="grow"
        >
          {isLoading ? <Loader className="animate-spin" /> : <ShoppingCart />}{" "}
          Add To Cart
        </Button>
        <Heart className="cursor-pointer" onClick={() => {addToWishList(productId)}}/>
      </CardFooter>
    </>
  );
}

export default AddToCart;
