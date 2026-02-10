import { CategoryInterface } from "@/interfaces/CategoryInterface";
import Link from "next/link";


async function Categories() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const {data} = await response.json();


  return (
    <div className="py-16">
      <h2 className="mb-10 text-3xl font-bold">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {
          data?.map((category: CategoryInterface) => {
            return (
              <div key={category._id}>
                <Link href={`/categories/${category._id}`}>
                <img src={category.image} alt={category.name} className="w-full h-80"/>
                <h3>{category.name}</h3>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Categories