import CategoryTemplate from "@/components/CategoryTemplate";

export default function Beauty() {
  return (
    <CategoryTemplate
      categoryKey="beauty"
      title="Красота"
      description="Косметика, парфюмерия и товары для красоты"
      emptyIcon="Sparkles"
      showFilters={true}
    />
  );
}
