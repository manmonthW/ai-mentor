import { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "产品展示",
  description: "我的AI作品与热门AI产品展示",
};

export default function ProductsPage() {
  return <ProductsContent />;
}
