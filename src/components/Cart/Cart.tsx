"use client";
import {
  clearCartAction,
  deleteProductAction,
  updateProductAction,
} from "@/actions/cartActions";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { CartRes } from "@/interfaces/CartInterfaces";
import { Loader2, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import CheckOutSession from "../CheckOutSession/CheckOutSession";

function Cart({ cartData }: { cartData: CartRes | null }) {
  const [cart, setCart] = useState<CartRes | null>(cartData || null);
  const [isLoading, setIsLoading] = useState(false);
  const [clearCartLoading, setClearCartLoading] = useState(false);


   dispatchEvent(new CustomEvent('cartUpdate', {detail: cart?.numOfCartItems ?? 0}))

  async function deleteCartProduct(productId: string) {
    setIsLoading(true);
    const response: CartRes = await deleteProductAction(productId);
    if (response.status == "success") {
      setCart(response);
      dispatchEvent(new CustomEvent('cartUpdate', {detail: response.numOfCartItems}))
    }
    setIsLoading(false);
  }

  async function clearCart() {
    setClearCartLoading(true);
    const response: CartRes = await clearCartAction();
    if (response.message == "success") {
      setCart(null);
       dispatchEvent(new CustomEvent('cartUpdate', {detail: 0}))
    }
    setClearCartLoading(false);
  }

  async function updateProductCount(productId: string, count: number) {
    const response: CartRes = await updateProductAction(productId, count);
    if (response.status == "success") {
      setCart(response);
      toast.success("Product Count Updated");
    }
  }

  return (
    <>
      {cart ? (
        <div className="py-12">
          <h2 className="text-2xl font-bold ">Shopping Cart</h2>
          <p className="mb-5">{cart.numOfCartItems} items in your cart</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-4">
            <div className="lg:col-span-2 ">
              {cart.data?.products?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex gap-5 border-2 shadow p-5 rounded-md mb-5"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-28 h-28"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h2 className="text-xl font-bold">
                            {item.product.title}
                          </h2>
                          <p className="text-sm font-semibold">
                            {item.product.brand.name} ·{" "}
                            {item.product.category.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-md font-bold">
                            {formatCurrency(item.price)}
                          </p>
                          <span className="text-sm font-semibold">each</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <button
                            className="border-2 cursor-pointer rounded-md p-2 w-8 h-8 text-2xl font-bold flex items-center justify-center"
                            disabled={item.count == 1}
                            onClick={() =>
                              updateProductCount(
                                item.product.id,
                                item.count - 1,
                              )
                            }
                          >
                            -
                          </button>
                          <span>{  item.count}</span>
                          <button
                            className="border-2 cursor-pointer rounded-md p-2 w-8 h-8 text-2xl font-bold flex items-center justify-center"
                            disabled={item.count == item.product.quantity}
                            onClick={() =>
                              updateProductCount(
                                item.product.id,
                                item.count + 1,
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-red-600 cursor-pointer"
                          onClick={() => deleteCartProduct(item.product.id)}
                        >
                          {isLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1  sticky top-18">
              <div className="flex flex-col gap-4 border-2 shadow p-5 rounded-md mb-3">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Subtotal (1 items)</p>
                  <p className="text-md font-bold">
                    {formatCurrency(cart?.data?.totalCartPrice)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Shipping</p>
                  <p className="text-green-600">Free</p>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <p className="text-md font-semibold">Total</p>
                  <p className="text-md font-semibold">
                    {formatCurrency(cart.data.totalCartPrice)}
                  </p>
                </div>
                <Button variant={"outline"}>Continue Shopping</Button>
                <CheckOutSession cartId={cart.cartId}/>
              </div>
              <Button
                disabled={isLoading}
                variant={"outline"}
                className="text-red-700 ms-auto flex items-center gap-2"
                onClick={() => clearCart()}
              >
                {" "}
                {clearCartLoading && <Loader2 className="animate-spin" />}{" "}
                <Trash2Icon /> Clear Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[70vh] w-full flex items-center justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-5">Your Cart is Empty</h2>
            <Button className="mx-auto block">
              <Link href={"/products"}>Go To Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
