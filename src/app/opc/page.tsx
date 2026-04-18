import { Metadata } from "next";
import OPCContent from "./OPCContent";

export const metadata: Metadata = {
  title: "OPC公司服务",
  description: "AI驱动的OPC公司一站式服务 — 智能报税、合同管理、合规管理",
};

export default function OPCPage() {
  return <OPCContent />;
}
