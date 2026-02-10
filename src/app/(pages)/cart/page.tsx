import { authOptions } from "@/auth";
import Cart from "@/components/Cart/Cart";
import { CartRes } from "@/interfaces/CartInterfaces";
import { getServerSession } from "next-auth";


async function CartPage() {
  const session = await getServerSession(authOptions);
   
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: session?.token as string
    }
  });
  const data: CartRes  = await response.json()


  return (
    <Cart cartData={data.numOfCartItems == 0 ? null :   data}/>
  )
}

export default CartPage