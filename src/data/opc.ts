import type { OPCService } from "@/types";

export const opcServices: OPCService[] = [
  {
    id: "opc1",
    name: "AI智能报税",
    description: "AI生成财报，帮助不懂财务税务的OPC公司创始人自动完成报税",
    status: "已上线",
    category: "财务",
    url: "https://github.com/manmonthW/xiaoda-tax",
    features: ["AI财报生成", "自动报税", "税务合规检查"],
  },
  {
    id: "opc2",
    name: "智能合同管理",
    description: "AI辅助合同草拟、审核与全生命周期管理",
    status: "规划中",
    category: "合同",
    features: ["合同草拟", "智能审核", "合同管理", "风险提示"],
  },
  {
    id: "opc3",
    name: "合规管理平台",
    description: "OPC公司合规要求自动跟踪与管理",
    status: "规划中",
    category: "合规",
    features: ["合规检查", "政策更新提醒", "合规报告"],
  },
  {
    id: "opc4",
    name: "业务管理中心",
    description: "精简版公司管理系统，专为OPC公司设计",
    status: "规划中",
    category: "业务",
    features: ["客户管理", "项目跟踪", "收支管理", "数据看板"],
  },
];
