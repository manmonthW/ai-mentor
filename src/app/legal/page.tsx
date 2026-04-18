import { Metadata } from "next";
import LegalContent from "./LegalContent";

export const metadata: Metadata = {
  title: "法律AI",
  description: "法律AI应用集 — 软著申请、专利代理师备考、合同审核等",
};

export default function LegalPage() {
  return <LegalContent />;
}
