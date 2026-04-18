import type { Tool } from "@/types";

export const tools: Tool[] = [
  { id: "1", name: "ChatGPT", description: "OpenAI对话AI助手", category: "聊天", url: "https://chat.openai.com", icon: "🤖", hot: 100 },
  { id: "2", name: "Claude", description: "Anthropic AI助手，擅长编程", category: "聊天", url: "https://claude.ai", icon: "🧠", hot: 98 },
  { id: "3", name: "Midjourney", description: "AI图像生成工具", category: "图像", url: "https://midjourney.com", icon: "🎨", hot: 95 },
  { id: "4", name: "Runway", description: "AI视频生成平台", category: "视频", url: "https://runwayml.com", icon: "🎬", hot: 92 },
  { id: "5", name: "Copilot", description: "GitHub AI编程助手", category: "编程", url: "https://github.com/features/copilot", icon: "💻", hot: 90 },
  { id: "6", name: "Notion AI", description: "AI写作和笔记助手", category: "写作", url: "https://notion.so", icon: "📝", hot: 88 },
  { id: "7", name: "通义千问", description: "阿里AI助手", category: "聊天", url: "https://tongyi.aliyun.com", icon: "🐱", hot: 85 },
  { id: "8", name: "Kimi", description: "月之暗面AI助手", category: "聊天", url: "https://kimi.moonshot.cn", icon: "🌙", hot: 83 },
  { id: "9", name: "可灵AI", description: "快手AI视频生成", category: "视频", url: "https://klingai.com", icon: "🎥", hot: 80 },
  { id: "10", name: "文心一言", description: "百度AI助手", category: "聊天", url: "https://yiyan.baidu.com", icon: "🦢", hot: 78 },
  { id: "11", name: "Canva AI", description: "AI设计工具", category: "设计", url: "https://canva.com", icon: "✏️", hot: 76 },
  { id: "12", name: "Descript", description: "AI音视频编辑", category: "音频", url: "https://descript.com", icon: "🎧", hot: 74 },
  { id: "13", name: "Cursor", description: "AI代码编辑器", category: "编程", url: "https://cursor.sh", icon: "⌨️", hot: 95 },
  { id: "14", name: "Gamma", description: "AI PPT生成", category: "办公", url: "https://gamma.app", icon: "📊", hot: 72 },
  { id: "15", name: "Perplexity", description: "AI搜索引擎", category: "搜索", url: "https://perplexity.ai", icon: "🔍", hot: 88 },
];
