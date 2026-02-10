import { Params } from "next/dist/server/request/params"

async function CategoryDetails({params}: {params: Params}) {
  const {categoryId} = await params;

  return (
    <div>CategoryDetails</div>
  )
}

export default CategoryDetails