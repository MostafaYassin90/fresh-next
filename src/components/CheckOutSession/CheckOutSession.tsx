"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { checkOutAction } from "@/actions/addToCart.action";
import { ShippingAddress } from "@/interfaces/CartInterfaces";
import { Loader2 } from "lucide-react";

function CheckOutSession({ cartId }: { cartId: string }) {

  const [isLoading, setIsLoading] = useState(false)

  const city = useRef<null | HTMLInputElement>(null);
  const details = useRef<null | HTMLInputElement>(null);
  const phone = useRef<null | HTMLInputElement>(null);


  async function checkOut() {
    setIsLoading(true)
    const shippingAddress: ShippingAddress = {
      details: details.current?.value as string,
      phone:  details.current?.value as string,
      city:  details.current?.value as string
    }
    const response = await checkOutAction(cartId, shippingAddress)

    if (response.status === "success") {
      window.location.href = response.session.url
    }
    setIsLoading(false)
  }


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Please Add Your Shipping Address
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input ref={city} id="city" name="city" defaultValue="Cairo" />
            </Field>
            <Field>
              <Label htmlFor="details">Details</Label>
              <Input ref={details} id="details" name="details" defaultValue="Maadi" />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phone} id="phone" name="phone" defaultValue="01159874521" />
            </Field>
           
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit" onClick={checkOut}>
              {isLoading && <Loader2 className="animate-spin"/>}
              Save changes
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CheckOutSession;
