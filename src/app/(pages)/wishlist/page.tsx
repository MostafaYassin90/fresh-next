import { authOptions } from '@/auth';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Product } from '@/interfaces/productInterface';
import { StarIcon } from 'lucide-react';
import { getServerSession } from 'next-auth';

async function Wishlist() {

  const session = await getServerSession(authOptions)

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
    headers: {
      token: session?.token as string
    }
  })
  const {data} = await response.json();


  return (
    <div className='py-16 px-[3vw] xl:px-[7vw]'>
      <h2 className='text-2xl font-bold mb-5'>WishList</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {
          data.map((product: Product) => {
            return (
            <Card>
              <img src={product.imageCover} alt='product-image'/>
              <CardHeader>
              <p className='text-gray-600 text-sm font-semibold'>{product.brand.name}</p>
              <h2 className='font-bold'>{product.title}</h2>
              <p className='text-gray-600 text-sm font-semibold'>{product.category.name}</p>
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
                    <p className='font-bold'>Price: {product.price} EGP</p>
                  </CardFooter>
            </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default Wishlist