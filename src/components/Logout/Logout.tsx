"use client"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";

function Logout() {
  return (
    <DropdownMenuItem
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Logout
    </DropdownMenuItem>
  );
}

export default Logout;
