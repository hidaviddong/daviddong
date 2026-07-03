// ============================================================
// Project data — migrated from the old Astro markdown collection.
// Images are imported so Vite handles hashing / optimization.
// ============================================================

// 98.ui
import ui98Cover from "@/assets/projects/98.ui/98.ui.png"

// autopdf
import autopdfResume from "@/assets/projects/autopdf/resume.png"
import autopdfCoverletter from "@/assets/projects/autopdf/coverletter.gif"
import autopdfReport from "@/assets/projects/autopdf/report.png"

// chatbot
import chatbotMain from "@/assets/projects/chatbot/main.webp"
import chatbotDialog from "@/assets/projects/chatbot/dialog.webp"
import chatbotImage from "@/assets/projects/chatbot/image.webp"
import chatbotLiterature from "@/assets/projects/chatbot/literature.webp"

// comments
import commentsGif from "@/assets/projects/comments/comments.gif"

// dApp
import dappSwap from "@/assets/projects/dApp/swap.png"
import dappStake from "@/assets/projects/dApp/stake.png"
import dappClaim from "@/assets/projects/dApp/claim.png"

// data-visualization
import dvModel from "@/assets/projects/data-visualization/model.webp"
import dvBaked from "@/assets/projects/data-visualization/baked.webp"
import dvTexture from "@/assets/projects/data-visualization/texture.webp"
import dvMap from "@/assets/projects/data-visualization/map.gif"
import dvEeg from "@/assets/projects/data-visualization/eeg.gif"

// lyrics
import lyricsPortrait from "@/assets/projects/lyrics/lyrics-portrait.webp"
import lyricsLandscape from "@/assets/projects/lyrics/lyrics-landscape.webp"

// next-media
import nmPoster from "@/assets/projects/next-media/poster.png"
import nmDetail from "@/assets/projects/next-media/detail.png"
import nmSubtitle from "@/assets/projects/next-media/subtitle.png"
import nmDirectPlay from "@/assets/projects/next-media/direct-play.png"
import nmRemux from "@/assets/projects/next-media/remux.png"
import nmHls from "@/assets/projects/next-media/hls.png"

// polymarket-tg-agent
import polymarketAgent from "@/assets/projects/polymarket-tg-agent/agent.gif"

// qrcode
import qrcodeDemo from "@/assets/projects/qrcode/demo.gif"

// tme
import tmeGame from "@/assets/projects/tme/game.gif"
import tmeRank from "@/assets/projects/tme/rank.gif"

// watchbus
import watchbusGif from "@/assets/projects/watchbus/watchbus.gif"

export type ProjectType = "个人" | "工作"

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectSection {
  heading?: string
  body?: string
  images?: ProjectImage[]
}

export interface Project {
  id: string
  title: string
  date: string
  type: ProjectType
  description: string
  cover: string
  links?: ProjectLink[]
  sections: ProjectSection[]
}

export const projects: Project[] = [
  {
    id: "autopdf",
    title: "AutoPDF",
    date: "2025",
    type: "个人",
    description: "通过对话，生成任意 PDF 的网页。",
    cover: autopdfResume,
    links: [{ label: "网站", href: "https://autopdf.app" }],
    sections: [
      {
        body: "通过对话，生成任意 PDF 的网页。\n\n功能：\n- PDF 下载\n- 多版本 PDF 切换",
        images: [
          { src: autopdfResume, alt: "resume", caption: "生成简历" },
          { src: autopdfCoverletter, alt: "coverletter", caption: "生成求职信" },
          { src: autopdfReport, alt: "report", caption: "生成报告" },
        ],
      },
    ],
  },
  {
    id: "polymarket-tg-agent",
    title: "Polymarket Telegram Agent",
    date: "2025",
    type: "个人",
    description:
      "基于 Grok 和 Polymarket API 的 Agent，输入交易事件链接，Agent 会自动搜寻相关事件，并给出投资建议。",
    cover: polymarketAgent,
    links: [
      { label: "GitHub", href: "https://github.com/hidaviddong/polymarket-telegram-agent" },
    ],
    sections: [
      {
        body: "基于 Grok 和 Polymarket API 的 Agent，输入交易事件链接，Agent 会自动搜寻相关事件，并给出投资建议。",
        images: [{ src: polymarketAgent, alt: "polymarket-telegram-agent", caption: "Agent" }],
      },
    ],
  },
  {
    id: "next-media",
    title: "Next Media",
    date: "2025",
    type: "个人",
    description: "一个 Web 端的媒体管理库，类似 Jellyfin 和 Emby。",
    cover: nmPoster,
    links: [{ label: "GitHub", href: "https://github.com/hidaviddong/next-media" }],
    sections: [
      {
        body: "一个 Web 端的媒体管理库，类似 Jellyfin 和 Emby。",
        images: [
          { src: nmPoster, alt: "海报墙", caption: "海报墙" },
          { src: nmDetail, alt: "详情页", caption: "详情页" },
          { src: nmSubtitle, alt: "多字幕", caption: "多字幕" },
        ],
      },
      {
        heading: "播放策略",
        images: [
          { src: nmDirectPlay, alt: "直接播放", caption: "直接播放" },
          { src: nmRemux, alt: "转码播放", caption: "转码播放" },
          { src: nmHls, alt: "HLS 播放", caption: "HLS 播放" },
        ],
      },
    ],
  },
  {
    id: "qrcode",
    title: "QRCode Login",
    date: "2025",
    type: "个人",
    description: "一个极简的二维码扫码登录系统。",
    cover: qrcodeDemo,
    links: [{ label: "GitHub", href: "https://github.com/hidaviddong/qrcode-login" }],
    sections: [
      {
        body: "一个极简的二维码扫码登录系统。",
        images: [{ src: qrcodeDemo, alt: "QRCode Login Demo", caption: "Demo" }],
      },
    ],
  },
  {
    id: "watchbus",
    title: "Watch Bus",
    date: "2025",
    type: "个人",
    description: "Apple Watch 应用，用于查看最近几趟香港巴士的到站时间。",
    cover: watchbusGif,
    sections: [
      {
        body: "Apple Watch 应用，用于查看最近几趟香港巴士的到站时间，暂未开放下载。",
        images: [{ src: watchbusGif, alt: "Watch Bus", caption: "Watch Bus" }],
      },
    ],
  },
  {
    id: "98ui",
    title: "98.ui",
    date: "2025",
    type: "个人",
    description: "基于 shadcn/ui 实现的 Windows98 风格组件库。",
    cover: ui98Cover,
    links: [{ label: "网站", href: "https://98-ui.vercel.app/" }],
    sections: [
      {
        body: "基于 shadcn/ui 实现的 Windows98 风格组件库。",
        images: [{ src: ui98Cover, alt: "98.ui" }],
      },
    ],
  },
  {
    id: "dapp",
    title: "Web3 dApp",
    date: "2025",
    type: "工作",
    description:
      "为 ATT（Advertising Time Trace）项目开发 dApp 界面，包括代币交换、代币质押、领取奖励等功能。",
    cover: dappSwap,
    links: [{ label: "ATT 官网", href: "https://www.attglobal.io/" }],
    sections: [
      {
        body: "为 ATT（Advertising Time Trace）项目开发 dApp 界面，包括代币交换、代币质押、领取奖励等功能。",
        images: [
          { src: dappSwap, alt: "swap", caption: "代币交换" },
          { src: dappStake, alt: "stake", caption: "代币质押" },
          { src: dappClaim, alt: "claim", caption: "领取奖励" },
        ],
      },
    ],
  },
  {
    id: "comments",
    title: "Comments",
    date: "2024",
    type: "个人",
    description:
      "一个可以轻松集成到任何网站的轻量级评论系统，是 Vercel Comments 的开源替代品。",
    cover: commentsGif,
    links: [{ label: "GitHub", href: "https://github.com/hidaviddong/comments" }],
    sections: [
      {
        body: "一个可以轻松集成到任何网站的轻量级评论系统，是 Vercel Comments 的开源替代品。\n\n如何使用：\n- 打开工具栏菜单，然后选择 Comment 或快捷方式中的注释气泡图标。\n- 鼠标移动到的 DOM 节点会突出显示，再次点击可以留下评论。",
        images: [{ src: commentsGif, alt: "comments", caption: "Comments" }],
      },
    ],
  },
  {
    id: "lyrics",
    title: "歌词灯牌",
    date: "2024",
    type: "个人",
    description: "用于现场表演的网页版歌词灯牌。竖屏下是歌单，横屏是歌词切换。",
    cover: lyricsLandscape,
    links: [{ label: "网站", href: "https://davidtao-blue.vercel.app/" }],
    sections: [
      {
        body: "用于现场表演的网页版歌词灯牌。竖屏下是歌单，横屏是歌词切换。",
        images: [
          { src: lyricsPortrait, alt: "lyrics-portrait", caption: "竖屏模式" },
          { src: lyricsLandscape, alt: "lyrics-landscape", caption: "横屏模式" },
        ],
      },
    ],
  },
  {
    id: "data-visualization",
    title: "数据可视化项目",
    date: "2024",
    type: "工作",
    description:
      "包含智慧园区建模、B 端可视化系统地图动效、EEG-X 人工智能脑电分析平台等多个数据可视化项目。",
    cover: dvModel,
    links: [{ label: "智慧园区网站", href: "https://my-desktop-nine.vercel.app/" }],
    sections: [
      {
        heading: "智慧园区",
        body: "负责办公场景的建模和前端 Three.js 交互部分。",
        images: [
          { src: dvModel, alt: "model", caption: "Blender 建模" },
          { src: dvBaked, alt: "baked", caption: "纹理烘焙" },
          { src: dvTexture, alt: "texture", caption: "烟雾特效" },
        ],
      },
      {
        heading: "B 端可视化系统",
        body: "使用 Echarts 创建一系列地图动态效果，如：飞线图、渐入渐出等等。",
        images: [{ src: dvMap, alt: "map", caption: "地图动效" }],
      },
      {
        heading: "EEG-X 人工智能脑电分析平台",
        body: "负责了 v1.0 版本的前端开发，使用 Echarts 来绘制脑电波形图，并集成了打点、数据转换等功能。",
        images: [{ src: dvEeg, alt: "eeg", caption: "脑电平台" }],
      },
    ],
  },
  {
    id: "chatbot",
    title: "基于大语言模型的 AI 诊疗助手",
    date: "2023",
    type: "工作",
    description:
      "AI 诊疗助手是一款医疗场景的智能辅助工具，利用检索增强（RAG）技术，使其能够迅速识别与当前病症相似的案例。",
    cover: chatbotMain,
    sections: [
      {
        body: "AI 诊疗助手是一款医疗场景的智能辅助工具，利用检索增强（RAG）技术，使其能够迅速识别与当前病症相似的案例。\n\n我负责从 0 到 1 整体前端架构的搭建和开发。",
        images: [
          { src: chatbotMain, alt: "main", caption: "首页" },
          { src: chatbotDialog, alt: "dialog", caption: "对话" },
          { src: chatbotImage, alt: "image", caption: "多模态" },
          { src: chatbotLiterature, alt: "literature", caption: "文献检索" },
        ],
      },
    ],
  },
  {
    id: "tme",
    title: "QQ 音乐",
    date: "2022",
    type: "工作",
    description: "参与混合移动端应用开发，包括直播间内抽奖小游戏和互通榜单。",
    cover: tmeGame,
    sections: [
      {
        body: "参与混合移动端应用开发。\n\n直播间内抽奖小游戏。",
        images: [{ src: tmeGame, alt: "game", caption: "小游戏" }],
      },
      {
        body: "将榜单改造成互通榜单，统一四款 App 的直播间送礼榜单页。",
        images: [{ src: tmeRank, alt: "rank", caption: "收礼排行榜" }],
      },
    ],
  },
]

// Sorted newest-first, matching the old index page behaviour.
export const sortedProjects = [...projects].sort(
  (a, b) => Number(b.date) - Number(a.date),
)
