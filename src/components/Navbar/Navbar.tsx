import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "../Logout/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CartIcon from "../CartIcon/CartIcon";
import { CartRes } from "@/interfaces/CartInterfaces";


 async function Navbar() {

  const session = await getServerSession(authOptions)
  let data: CartRes | null = null

  if (session) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
       headers: {
         token: session?.token as string
       }
     });
      data = await response.json()
  }

  return (
    <nav className="bg-white shadow py-4 px-[3vw] xl:px-[7vw]">
      <div className="container mx-auto  font-semibold flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl">
          {" "}
          <Link href={"/"}>Shop Mart</Link>{" "}
        </h2>

        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <UserIcon className="size-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    {
                      session ? 
                      <>
                    <Link href={"/profile"}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href={"/wishlist"}>
                      <DropdownMenuItem>Wishlist</DropdownMenuItem>
                    </Link>
                    <Link href={"/allorders"}>
                      <DropdownMenuItem>MyOrder</DropdownMenuItem>
                    </Link>
                      <Logout/>
                      </> 
                      :
                       <>
                    <Link href={"/login"}>
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href={"/register"}>
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                      </>
                    }
                  
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="">
                  {
                    session && data &&
                    <CartIcon serverCartNum={data?.numOfCartItems} cartId={data.data.cartOwner}/>
                  }
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
