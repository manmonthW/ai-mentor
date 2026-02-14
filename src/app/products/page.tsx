import { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "AI产品展示 - 发现最新AI产品",
  description: "发现最新AI产品：工具、应用、硬件、Agent等各类AI产品展示",
};

export default function ProductsPage() {
  return <ProductsContent />;
}
