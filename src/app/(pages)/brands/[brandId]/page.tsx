import BrandProducts from "@/components/BrandProducts/BrandProducts";

interface ParamsInterface {
  params: {
    brandId: string
  }
}

async function BrandDetails({params}:ParamsInterface) {
  const {brandId} = await params;

  return (
   <>
   <BrandProducts brandId={brandId}/>
   </>
  )
}

export default BrandDetails