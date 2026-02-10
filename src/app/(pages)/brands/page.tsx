import { Card } from "@/components/ui/card";
import { BrandInterface } from "@/interfaces/BrandInterface";


async function Brands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
  const {data} = await response.json();

  return (
    <div className="px-[3vw] xl:px-[7vw] py-16">
      <h2 className="text-2xl font-semibold mb-5">Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {
          data.map((brand: BrandInterface) => {
            return (
              <Card key={brand._id}>
                <img src={brand.image} alt={brand.name}/>
                <h3 className="text-xl font-semibold text-center">{brand.name}</h3>
              </Card>
            )
          })
        }
      </div>
    </div>
  )

}

export default Brands