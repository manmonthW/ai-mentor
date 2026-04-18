import { Metadata } from "next";
import LearnContent from "./LearnContent";

export const metadata: Metadata = {
  title: "培训中心",
  description: "覆盖通用AI、教培行业、物流行业的系统化AI培训课程体系",
};

export default function LearnPage() {
  return <LearnContent />;
}
