import BallCatchGame from "@/components/BallCatchGame";

export default function Game() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BallCatchGame isSellerView={false} />
    </div>
  );
}
