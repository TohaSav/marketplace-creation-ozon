import CategoryTemplate from "@/components/CategoryTemplate";

export default function Books() {
  return (
    <CategoryTemplate
      categoryKey="books"
      title="Книги"
      description="Художественная литература, учебники и справочники"
      emptyIcon="Book"
    />
  );
}
