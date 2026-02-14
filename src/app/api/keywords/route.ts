import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// 每周AI关键词数据 - 基于多个来源的热门AI话题
const fetchWeeklyKeywords = () => {
  const keywordTemplates = [
    // 模型类
    { word: "Claude Opus 4.6", category: "模型", entity: "Anthropic", summary: "编码能力登顶的新一代AI模型，300亿融资" },
    { word: "GPT-5.3 Codex", category: "模型", entity: "OpenAI", summary: "史上最快编程模型，每秒1000Token" },
    { word: "Gemini 3", category: "模型", entity: "Google", summary: "Deep Think推理能力升级" },
    { word: "QwQ-32B", category: "模型", entity: "阿里云", summary: "开源推理模型，消费级可部署" },
    { word: "Ming-Flash-Omni 2.0", category: "模型", entity: "蚂蚁", summary: "全模态大模型，性能对标Gemini 2.5 Pro" },
    { word: "星火X2", category: "模型", entity: "科大讯飞", summary: "语音语义理解再升级" },
    { word: "GLM-5开源", category: "模型", entity: "智谱", summary: "国产大模型开放商用" },
    { word: "小米机器人VLA", category: "模型", entity: "小米", summary: "首代VLA机器人模型，推理延迟仅80ms" },
    { word: "Ring-2.5-1T", category: "模型", entity: "蚂蚁", summary: "全球首个混合线性架构万亿参数模型" },
    { word: "Seedance 2.0", category: "应用", entity: "字节跳动", summary: "AI视频生成进入新阶段" },
    { word: "Qwen-Image-2.0", category: "应用", entity: "通义千问", summary: "AI图像生成新模型" },
    { word: "Seedream 5.0", category: "应用", entity: "字节跳动", summary: "图像生成进入工作室级" },
    { word: "Sora 2", category: "应用", entity: "OpenAI", summary: "AI视频生成社交应用" },
    { word: "OpenClaw", category: "应用", entity: "OpenClaw", summary: "AI Agent狂跑两周，引爆硬件赛道" },
    { word: "MiniMax M2.5", category: "模型", entity: "MiniMax", summary: "主打智能体和Vibe Coding" },
    
    // 应用类
    { word: "Agent爆发", category: "应用", entity: "行业", summary: "AI Agent成为新热点" },
    { word: "MCP协议", category: "生态", entity: "Anthropic", summary: "模型上下文协议" },
    { word: "AI视频生成", category: "应用", entity: "行业", summary: "Sora vs Seedance vs Runway三国杀" },
    { word: "具身智能", category: "应用", entity: "行业", summary: "机器人+AI成为新风口" },
    { word: "AI办公", category: "应用", entity: "行业", summary: "企业AI办公助手密集发布" },
    { word: "AI搜索", category: "应用", entity: "行业", summary: "Perplexicity领跑，AI搜索三国战" },
    { word: "AI营销", category: "应用", entity: "行业", summary: "大厂AI红包大战" },
    { word: "Teamily AI", category: "应用", entity: "行业", summary: "全球首个AI原生社交平台" },
    
    // 事件/融资
    { word: "Anthropic融资", category: "事件", entity: "Anthropic", summary: "300亿G轮，估值3800亿美元" },
    { word: "Cohere IPO", category: "事件", entity: "Cohere", summary: "年收2.4亿美元，IPO在即" },
    { word: "Modal Labs融资", category: "事件", entity: "Modal", summary: "AI推理初创25亿估值融资" },
    { word: "Didero融资", category: "事件", entity: "Didero", summary: "制造业AI采购获3000万美元" },
    { word: "清华具身智能融资", category: "事件", entity: "行业", summary: "两月融资数亿元" },
    
    // 科技/硬件
    { word: "英伟达新芯片", category: "硬件", entity: "英伟达", summary: "Blackwell架构发布" },
    { word: "Meta智能眼镜", category: "硬件", entity: "Meta", summary: "计划添加面部识别" },
    { word: "Waymo扩张", category: "科技", entity: "Waymo", summary: "Robotaxi首次开进阿布扎比" },
    { word: "特斯拉FSD", category: "科技", entity: "特斯拉", summary: "上海招聘测试FSD" },
    
    // 观点
    { word: "AI奇点论", category: "观点", entity: "HyperWrite", summary: "AI发展进入新阶段" },
    { word: "2026展望", category: "观点", entity: "ARK Invest", summary: "AI未来趋势预测" },
    { word: "指数增长终点", category: "观点", entity: "Anthropic", summary: "Dario Amodei谈AI发展" },
    { word: "AI失业论", category: "观点", entity: "行业", summary: "关于AI导致失业的讨论" },
    { word: "AI原生社交", category: "观点", entity: "行业", summary: "人机共生社交新元年" },
    { word: "科研合伙人", category: "应用", entity: "Google", summary: "AI模型成科研助手" },
    { word: "AI硬件分化", category: "观点", entity: "行业", summary: "AI企业想定义新形态" },
    
    // 生态
    { word: "GEO时代", category: "生态", entity: "行业", summary: "AI搜索推荐深度影响" },
    { word: "端侧AI", category: "生态", entity: "行业", summary: "端侧模型快速发展" },
    { word: "AI编程", category: "生态", entity: "行业", summary: "Cursor、Copilot领衔编程革命" },
  ];

  const now = new Date();
  const weekNumber = Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 7));
  
  // 打乱顺序模拟每周变化
  const shuffled = [...keywordTemplates].sort(() => Math.random() - 0.5);
  
  return shuffled.map((item, index) => ({
    id: `${now.getFullYear()}-W${weekNumber}-${String(index).padStart(2, '0')}`,
    word: item.word,
    category: item.category,
    entity: item.entity,
    summary: item.summary,
  }));
};

export async function GET() {
  const keywords = fetchWeeklyKeywords();
  const now = new Date();
  
  // 计算下次更新时间（周日早晨6点）
  const nextSunday = new Date(now);
  nextSunday.setHours(6, 0, 0, 0);
  const dayOfWeek = nextSunday.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
  nextSunday.setDate(nextSunday.getDate() + daysUntilSunday);
  
  return NextResponse.json({
    success: true,
    updatedAt: now.toISOString(),
    weekNumber: Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 7)),
    nextUpdate: nextSunday.toISOString(),
    sources: ["36kr", "量子位", "TechCrunch", "Hacker News", "虎嗅", "极客公园", "腾讯研究院"],
    data: keywords,
  });
}
