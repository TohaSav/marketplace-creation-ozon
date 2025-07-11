import CategoryTemplate from "@/components/CategoryTemplate";

export default function Clothing() {
  return (
    <CategoryTemplate
      categoryKey="clothing"
      title="Одежда"
      description="Мужская и женская одежда, обувь и аксессуары"
      emptyIcon="Shirt"
      showFilters={true}
    />
  );
}
