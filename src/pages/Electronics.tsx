import CategoryTemplate from "@/components/CategoryTemplate";

export default function Electronics() {
  return (
    <CategoryTemplate
      categoryKey="electronics"
      title="Электроника"
      description="Смартфоны, компьютеры, гаджеты и электроника"
      emptyIcon="Smartphone"
      showFilters={true}
    />
  );
}
