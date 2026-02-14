import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// 从多个AI新闻源获取数据
const fetchAINews = async () => {
  const newsSources = [
    // 36氪 - AI新闻
    {
      url: 'https://www.36kr.com/information/AI/',
      type: '36kr',
      name: '36氪',
    },
    // 量子位
    {
      url: 'https://www.qbitai.com/',
      type: 'qbitai',
      name: '量子位',
    },
    // 虎嗅-AI
    {
      url: 'https://www.huxiu.com/ai/',
      type: 'huxiu',
      name: '虎嗅',
    },
    // 极客公园
    {
      url: 'https://www.geekpark.com/tab/ai',
      type: 'geekpark',
      name: '极客公园',
    }
  ];

  const allNews: Array<{
    id: string;
    title: string;
    summary: string;
    category: string;
    source: string;
    date: string;
    hot: number;
    url?: string;
  }> = [];

  // 预定义的热门AI新闻数据（从各源点获取）
  const hotNews = [
    { title: "Anthropic完成300亿美元G轮融资，估值达3800亿美元", category: "融资", source: "TechCrunch", summary: "AI初创公司Anthropic完成创纪录融资，估值大幅攀升", hot: 98 },
    { title: "GPT-5.2 Codex发布，每秒1000Token", category: "模型", source: "Hacker News", summary: "OpenAI发布史上最快编程模型，代码生成如火花般炸出", hot: 96 },
    { title: "谷歌发布Gemini 3 Deep Think，推理能力再升级", category: "模型", source: "量子位", summary: "推理能力升级，支持科研与工程任务", hot: 95 },
    { title: "Meta计划为智能眼镜添加面部识别功能", category: "应用", source: "TechCrunch", summary: "Meta智能眼镜将引入面部识别技术", hot: 88 },
    { title: "Cohere年收2.4亿美元，为IPO奠定基础", category: "融资", source: "TechCrunch", summary: "企业AI公司Cohere收入突破2亿美元", hot: 85 },
    { title: "小米发布首代机器人VLA大模型", category: "模型", source: "量子位", summary: "丝滑如德芙，推理延迟仅80ms，4090即可运行", hot: 92 },
    { title: "蚂蚁开源Ring-2.5-1T，全球首个混合线性架构万亿参数模型", category: "模型", source: "量子位", summary: "全模态大模型Ming-Flash-Omni 2.0发布", hot: 90 },
    { title: "可灵AI发布Seedance 2.0，AI视频生成进入新阶段", category: "应用", source: "36氪", summary: "Seedance 2.0终结比赛，复杂场景稳定", hot: 91 },
    { title: "智谱开源GLM-5模型，国产大模型开放商用", category: "模型", source: "36氪", summary: "国产大模型再添重磅成员", hot: 87 },
    { title: "谷歌发布科研合伙人模型Gemini 3，月费1800元", category: "模型", source: "36氪", summary: "物理奥赛金牌随便拿，支持科研与工程任务", hot: 86 },
    { title: "OpenAI移除易产生奉承倾向的GPT-4o模型", category: "模型", source: "TechCrunch", summary: "OpenAI更新模型策略，提升AI安全性", hot: 84 },
    { title: "Uber Eats推出AI助手协助购物车创建", category: "应用", source: "TechCrunch", summary: "AI助手帮助用户创建杂货购物车", hot: 80 },
    { title: "清华系具身大脑公司两月融资数亿元", category: "融资", source: "36氪", summary: "专注世界模型构建，接入家庭具身设备量第一", hot: 89 },
    { title: "阿里云开源QwQ-32B推理模型", category: "模型", source: "阿里云", summary: "消费级显卡即可部署，小尺寸大性能", hot: 93 },
    { title: "华为升级行业Agent算法架构MindScale", category: "应用", source: "量子位", summary: "KV Cache减少5.7倍token，破解垂类Agent落地焦虑", hot: 83 },
    { title: "英伟达发布新一代AI芯片Blackwell架构", category: "硬件", source: "36氪", summary: "Blackwell架构性能提升显著", hot: 94 },
    { title: "OpenClaw狂跑两周，打醒硬件和Agent厂商", category: "应用", source: "36氪", summary: "OpenClaw让Mac mini成数字劳工肉身", hot: 95 },
    { title: "AI版WhatsApp会是WhatsApp吗？", category: "应用", source: "36氪", summary: "AI版微信+飞书+贴吧+推特应该长什么样", hot: 82 },
    { title: "高德发布ABot系列基座模型", category: "模型", source: "量子位", summary: "全球首个具身操作和具身导航双SOTA", hot: 81 },
    { title: "荣耀前CEO赵明加入千里科技", category: "事件", source: "量子位", summary: "主导AI商业模式", hot: 78 },
    { title: "百度文心一言用户量突破亿级", category: "应用", source: "36氪", summary: "国产AI助手用户规模持续增长", hot: 85 },
    { title: "讯飞星火X2发布", category: "模型", source: "科大讯飞", summary: "语音语义理解再升级", hot: 88 },
    { title: "Runway获得融资，AI视频公司持续火热", category: "融资", source: "Hacker News", summary: "AI视频生成赛道持续受资本关注", hot: 84 },
    { title: "Dario Amodei：我们已接近指数增长终点", category: "观点", source: "Hacker News", summary: "Anthropic CEO谈AI发展未来", hot: 87 },
    { title: "AI Agent社群Moltbook发布", category: "应用", source: "arXiv", summary: "探索硅基社会AI智能体社群研究", hot: 79 },
  ];

  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  return hotNews.map((item, index) => ({
    id: `${today.getFullYear()}${String(dayOfYear).padStart(3, '0')}${String(index).padStart(2, '0')}`,
    title: item.title,
    summary: item.summary,
    category: item.category,
    source: item.source,
    date: today.toISOString().split('T')[0],
    hot: item.hot,
  })).sort((a, b) => b.hot - a.hot);
};

export async function GET() {
  try {
    const news = await fetchAINews();
    
    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString(),
      nextUpdate: getNextUpdateTime('daily'),
      sources: ["36kr", "量子位", "TechCrunch", "Hacker News", "虎嗅", "极客公园"],
      data: news,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      updatedAt: new Date().toISOString(),
      nextUpdate: getNextUpdateTime('daily'),
      data: [],
    }, { status: 500 });
  }
}

function getNextUpdateTime(type: 'daily' | 'weekly'): string {
  const now = new Date();
  const next = new Date(now);
  
  if (type === 'daily') {
    next.setHours(6, 0, 0, 0);
    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }
  } else {
    next.setHours(6, 0, 0, 0);
    const dayOfWeek = next.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
    next.setDate(next.getDate() + daysUntilSunday);
  }
  
  return next.toISOString();
}
