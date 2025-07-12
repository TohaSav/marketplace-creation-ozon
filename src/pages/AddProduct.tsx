import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useAddProduct } from "@/hooks/useAddProduct";
import AccessDenied from "@/components/add-product/AccessDenied";
import PageHeader from "@/components/add-product/PageHeader";
import SubscriptionInfo from "@/components/add-product/SubscriptionInfo";
import ProductForm from "@/components/add-product/ProductForm";

export default function AddProduct() {
  const { user } = useAuth();
  const { canAddProduct, subscriptionStatus } = useSubscription();
  const {
    product,
    loading,
    updateProduct,
    regenerateArticle,
    regenerateBarcode,
    handleImageChange,
    submitProduct,
    cancelAddProduct,
  } = useAddProduct();

  // Проверяем подписку
  const productCheck = canAddProduct();
  if (!productCheck.allowed) {
    return <AccessDenied type="subscription" reason={productCheck.reason} />;
  }

  // Проверяем статус продавца - разрешаем доступ только подтвержденным
  if (user?.userType === "seller" && user?.status !== "active") {
    return <AccessDenied type="status" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitProduct();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader onBack={cancelAddProduct} />

      {subscriptionStatus && (
        <SubscriptionInfo subscriptionStatus={subscriptionStatus} />
      )}

      <ProductForm
        product={product}
        loading={loading}
        onUpdate={updateProduct}
        onRegenerateArticle={regenerateArticle}
        onRegenerateBarcode={regenerateBarcode}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        onCancel={cancelAddProduct}
      />
    </div>
  );
}
