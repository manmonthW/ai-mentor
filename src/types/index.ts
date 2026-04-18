export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  date: string;
  hot?: number;
  url?: string;
}

export interface Keyword {
  id: string;
  word: string;
  category: string;
  entity: string;
  summary: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  hot: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  level: string;
  tags: string[];
  industry?: string;
  modules?: string[];
  isOwn?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  url: string;
  developer: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: "名人系列" | "经典名著系列" | "工具类" | "创作类" | "其他";
  platform: "claude-code" | "kiro" | "通用" | "其他";
  githubUrl?: string;
  tags: string[];
  createdFrom?: string;
  featured?: boolean;
}

export interface LegalApp {
  id: string;
  name: string;
  description: string;
  type: "自研" | "收集";
  category: "软著" | "专利" | "合同" | "合规" | "通用";
  url?: string;
  githubUrl?: string;
  tags: string[];
}

export interface OPCService {
  id: string;
  name: string;
  description: string;
  status: "已上线" | "开发中" | "规划中";
  category: "财务" | "合同" | "合规" | "业务";
  url?: string;
  features: string[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  industry: "通用" | "教培" | "物流" | string;
  modules: TrainingModule[];
  level: string;
  slug: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  lessons: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
}

export interface Category {
  name: string;
  color: string;
}
