"use client"
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function CartIcon({serverCartNum, cartId}: {serverCartNum: number, cartId: string}) {
  if (cartId) {
    localStorage.setItem("cartId", cartId)
  }
  const [cartNum, setCartNum] = useState(serverCartNum)

  
  useEffect(() => {

    function handler(e: CustomEvent) {
      setCartNum(e.detail)
    }

    window.addEventListener("cartUpdate",handler as EventListener)

  }, [])

  return (
    <>
      <Link href="/cart" className="relative">
        <span className="absolute w-5 h-5 bg-black text-white rounded-full flex items-center justify-center -top-2.5 -right-2.5">
          {cartNum}
        </span>{" "}
        <ShoppingCartIcon className="size-6 text-inherit" />{" "}
      </Link>
    </>
  );
}

export default CartIcon;
