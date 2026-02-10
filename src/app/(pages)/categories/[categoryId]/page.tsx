import CategoryProducts from "@/components/CategoryProducts/CategoryProducts";

interface CategoryDetailsProps {
  params: {
    categoryId: string
  }
}

async function CategoryDetails({params}: CategoryDetailsProps) {
  const {categoryId} = await params;

  return (
    <>
    <CategoryProducts categoryId={categoryId}/>
    </>
  )
}

export default CategoryDetails