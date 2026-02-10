"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader } from "lucide-react"



const formSchema = z.object({
  email: z.email("invalid email").nonempty("Email Is Required"),
  password: z.string().nonempty("Password Is Required")
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
})

type formData  = z.infer<typeof formSchema>


export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams();
  const  redirectURL = searchParams.get('url')

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  async function onSubmit(data: formData) {
    setIsLoading(true)
    const response = await signIn( "credentials" , {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl:redirectURL ? redirectURL :  "/products",
      
    })
    if (response?.ok) {
      toast.success("Success Login")
      router.push("/products")
    }else {
      toast.error(response?.error + "")
    }
    setIsLoading(false)
  }

  return (
    <Card className="w-full sm:max-w-md">
      
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
        
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button disabled={isLoading} type="submit" form="form-rhf-demo">
            {isLoading && <Loader className="animate-spin"/>}
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
