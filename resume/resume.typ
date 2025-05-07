#show heading: set text(font: ("PingFang SC"))
#show link: underline
#let today() = {
  let month = (
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
  ).at(datetime.today().month() - 1);
  let day = datetime.today().day();
  let year = datetime.today().year();
  [#month #day, #year]
}

#let chiline() = {v(-3pt); line(length: 100%); v(-5pt)}

#set text(
  size: 10pt,
  font: "PingFang SC"
)

#set page(
  margin: (x: 0.9cm, y: 1.3cm),
)

#set par(justify: true)

#let additional-block = block.with(
  fill: rgb("f5f5f5"),
  inset: 1em,           
  radius: 4pt,          
  width: 100%,          
)

#let lang-block = block.with(
  stroke: (left: 4pt + rgb("4a5568")),
  fill: rgb("f8f9fa"),
  inset: (left: 1em, rest: 0.8em),
  width: 100%,
)


= DONG, Haoyu (David) / 董皓宇

#link("mailto:hidaviddong@gmail.com") / 🇭🇰 +852 46720879 / 🇨🇳 +86 19926690273 / #link("https://wa.link/bbs3i9")[WhatsApp] / #link("https://github.com/hidaviddong")[GitHub] / #link("https://daviddong.me")[Website]



#additional-block[
  #text(weight: "bold", size: 1em)[Summary: ]
  Three years of experience in front-end development, previously employed at Tencent Music and Peking University Changsha Institute. Skilled in developing AI application, dApps, and data visualization.
    #v(0.1em)
  #text(weight: "bold", size: 1em)[VISA Status: ]
  Current Student Visa holder, eligible for IANG and available for work from July 2025.
  #v(0.1em)
  #text(weight: "bold", size: 1em)[Languages: ]
  Putonghua (Native), Cantonese (Beginner), English (Intermediate)
  #v(0.1em)
  #text(weight: "bold", size: 1em)[Expected Salary: ]
  HKD 25,000 - 30,000 monthly 
]

== Skills
#chiline()
- *Frontend:* Proficient in JavaScript/TypeScript, React, Vue.js ecosystems, and full-stack frameworks like Next.js. Experienced with state management tools and performance optimization.
- *Backend:* Basic knowledge of Node.js and Express for building services, MongoDB/MySQL for data storage, and Playwright for automated testing and web scraping.
- *DevOps:* Familiar with Docker containerization, Nginx configuration, and CI/CD workflows using GitHub Actions.


== Work Experience
#chiline()

*Web3.0 Technology Limited* #h(1fr) Nov 2024 - Present \
Frontend Developer (Intern) #h(1fr) Hong Kong \
- Developed and optimized a Next.js admin dashboard for #link("https://daviddong.me/projects/dapp")[Central Node 55] events, implementing user configuration, node management, and reward distribution features. Integrated ECharts modules for user activity and geographic distribution data visualization.
- Built a complete Web3 client interface with token exchange, staking, and NFT reward claiming using Wagmi for smart contract interactions.
- Designed and developed data analysis using TypeScript scripts to process cross-platform data sources (XLSX, CSV, TXT), enabling wallet address verification and token holding analysis.

*PKU-Changsha Institute for Computing and Digital Economy* #h(1fr) July 2023 - July 2024 \
Frontend Developer (Full Time)#h(1fr) Changsha, China \
- Led development of an #link("https://daviddong.me/projects/chatbot")[AI-powered medical assistant], building React application architecture with SSE streaming, user role management, and literature search features.
- Collaborated across departments to develop the #link("http://www.eeg-x.com/")[EEG-X intelligent EEG analysis platform], designing high-precision EEG waveform visualization components with ECharts.
- Developed a #link("https://daviddong.me/projects/data-visualization")[data visualization project] using Three.js, Blender to build interactive 3D office scenes, reducing loading time by 50% through model compression and rendering optimization.

*Tencent Music Entertainment* #h(1fr) May 2022 - Oct 2022 \
Frontend Developer (Intern) #h(1fr) Shenzhen, China \
- Developed #link("https://daviddong.me/projects/tme")[interactive games] for live streaming rooms in QQ Music, WeSing, and JOOX using H5 hybrid native technology.
- Participated in the leaderboard feature reconstruction project, implementing cross-platform logic and using a unified npm component library to reduce code redundancy.


\
In my spare time, I enjoy exploring new technologies. I developed #link("https://daviddong.me/projects/autopdf")[*AutoPDF*], a chat-based PDF generation tool powered by large language models, and #link("https://daviddong.me/projects/comments")[*Comments*], a lightweight open-source comment system (50+ GitHub stars). I also actively contribute to open source communities, including Node.js core (#link("https://github.com/nodejs/node/pull/54569")[PR\#54569]) and React.js documentation (#link("https://github.com/reactjs/react.dev/pull/6509")[PR\#6509]).

== Education
#chiline()

*Hong Kong Metropolitan University* #h(1fr) Sep 2024 -- Sep 2025 \
Master of Computing in Computer Science #h(1fr) Hong Kong \
- The Katie Shu Sui Pui Charitable Trust — Research Training Fellowship in 2024
- Participating in deep learning research on point cloud compression

*ShenZhen University* #h(1fr) Sep 2020 -- June 2023 \
Master of Science in Materials Science and Engineering #h(1fr) Shenzhen, China \
- Published a paper on zinc-air batteries as second author in Carbon journal

*Hunan University of Technology* #h(1fr) Sep 2016 -- June 2020 \
Bachelor of Science in Construction Environment and Energy Application Engineering  #h(1fr) Zhuzhou, China \

// 中文简历
#pagebreak()

#let avatar-size = 3cm

#grid(
  columns: (5fr, 1fr),
  column-gutter: 2.5em,
  align: start,
  [
    = 董皓宇
    #v(0.5em)
    #text(size: 10pt )[
      19926690273 / hidaviddong\@gmail.com / #link("https://github.com/hidaviddong")[GitHub] / #link("https://daviddong.me")[Website]

      男, 1999年出生于湖南益阳，现居香港/深圳。目前正在寻求一份软件开发岗位。\
  
      我有三年前端开发经验，参与过*大语言模型应用、去中心化应用、中后台管理系统*的开发。

      熟练掌握前端开发技术栈 *TypeScipt, React.js* 以及周边生态的使用。具备基础后端开发能力，能够使用 *Node.js, Express* 构建 API 服务。了解 Docker 容器化工具以及CICD 的实践。
    
    ]
  ],
  block(
    width: avatar-size,
    height: avatar-size,
    radius: 0%,
    stroke: (paint: rgb("#cccccc"), thickness: 1pt),
    clip: false,
    image("avatar.jpg", width: 100%, height: 100%, fit: "cover")
  )
)

== 工作经历
#chiline()

*Web3.0 Technology Limited* - 前端开发实习生 #h(1fr) 2024 年 11 月 - 2025 年 4 月，香港\

*北京大学长沙计算与数字经济研究院* - 前端开发工程师 #h(1fr) 2023年7月 - 2024年7月，长沙 \

*腾讯音乐娱乐集团* - 前端开发实习生 #h(1fr)  2022年5月 - 2022年10月，深圳 \

== 项目经历
#chiline()

#link("https://daviddong.me/projects/dapp")[*DApp去中心化应用*] - Web3.0 Technology Limited #h(1fr) 2025 \
+ 主导应用路由重构：引入 Next.js App Router 替代旧有状态驱动导航，显著提升页面初始加载速度并优化了代码架构。
+ 改进智能合约交互体验：在abitype 库的基础上自定义类型，实现了合约数据的具名属性访问 (e.g., ⁠res.id vs ⁠res[0])，大幅增强了代码可读性与类型安全性。

#link("https://daviddong.me/projects/chatbot")[*基于大语言模型的 AI 诊疗助手*] - 北京大学长沙计算与数字经济研究院 #h(1fr) 2024 \
+ 从零主导前端架构与部署优化：独立完成技术选型 (React, Vite, TailwindCSS, React Router, Jotai)，引入 Playwright 进行E2E测试，zod 进行用户输入和表单校验，通过Docker多阶段构建将部署镜像从100MB显著压缩至20MB，实现高效私有化部署。
+ 打造流畅AI对话核心体验：运用SSE实现AI流式响应，并使用React Query乐观更新解决数据同步延迟，使用 remark 解析生成的markdown及实现动态光标效果，全面提升用户交互友好度。
+ 驱动项目成功落地与持续迭代：参与并负责系统在大型三甲医院的部署与测试，并建立用户反馈机制，持续收集需求指导产品优化，有效提升医生诊疗效率。

#link("https://daviddong.me/projects/data-visualization")[*智慧园区可视化系统*] - 北京大学长沙计算与数字经济研究院 #h(1fr) 2023 \
+ 构建交互式3D办公场景并极致优化渲染性能： 运用 Blender 与 Three.js 搭建可交互3D环境，通过预烘焙光照贴图及模型精简，成功解决渲染卡顿，将实时光照计算转为预渲染，确保了流畅帧率。
+ 开发动态地理数据可视化模块： 基于 ECharts 实现地图标记高亮、动态飞线及数据渐变等多种交互效果，显著提升了园区运营数据的呈现直观性。

#link("https://daviddong.me/projects/tme")[*QQ 音乐直播间活动页开发*] - 腾讯音乐娱乐集团 #h(1fr) 2022\
+ 参与千万级用户平台直播H5活动页开发： 为QQ音乐，全民K歌等核心产品开发交互式直播运营活动（如绿钻抽奖，页面小游戏等），保障了活动的稳定性和用户体验。
+ 跨App核心组件统一： 针对QQ音乐/全民K歌/懒人听书的直播送礼榜单，重构为统一可配置React组件，显著提升迭代效率、代码复用率，并确保了三大平台视觉与交互的一致性。

*独立开发项目* #h(1fr) 2023-2025\
+ #link("https://daviddong.me/projects/autopdf")[*AutoPDF*] - 基于大语言模型的对话式PDF生成工具。
+ #link("https://daviddong.me/projects/comments")[*Comments*] - 轻量级开源评论系统，GitHub Star 50+，阮一峰周刊推荐。
+ 积极参与开源社区：Nodejs、React.js 贡献者。


== 教育经历
#chiline()

*香港都会大学* - 计算机硕士 #h(1fr)2024年9月 - 2025年9月，香港
\ 入学前获得Katie Shu Sui Pui奖学金, 参与深度学习点云压缩研究项目，并发表相关论文。

*深圳大学* - 材料与化工硕士 #h(1fr) 2020年9月 - 2023年6月，深圳
\ 在校期间获得校园二等奖学金，参与金属空气电池研究项目，并发表论文收录在 Carbon期刊。

*湖南工业大学* - 建筑环境与能源应用工程学士 #h(1fr)2016年9月 - 2020年6月，株洲
