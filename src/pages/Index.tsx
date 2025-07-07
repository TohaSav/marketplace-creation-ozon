import ProductsSection from "@/components/ProductsSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Calibre Store</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProductsSection title="Рекомендуемые товары" />
      </main>
    </div>
  );
}
