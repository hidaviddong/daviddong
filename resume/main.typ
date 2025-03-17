#show heading: set text(font: "Times New Roman")
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
)

#set page(
  margin: (x: 0.9cm, y: 1.3cm)
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
- Developed a #link("https://daviddong.me/projects/data-visualization")[data visualization project] using Three.js to build interactive 3D office scenes, reducing loading time by 50% through model compression and rendering optimization.

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

// 中文
#pagebreak()

#set text(font: "LXGW WenKai TC")
= 董皓宇
#link("mailto:hidaviddong@gmail.com") / 🇭🇰 +852 46720879 / 🇨🇳 +86 19926690273 / #link("https://wa.link/bbs3i9")[WhatsApp] / #link("https://github.com/hidaviddong")[GitHub] / #link("https://daviddong.me")[Website]


#additional-block[
  #text(weight: "bold", size: 1em)[签证状态: ]
  目前持有学生签证, 符合 IANG 申请资格, 预计 2025 年 7 月获得 IANG 签证开始工作。
  #v(0.1em)
  #text(weight: "bold", size: 1em)[语言: ]
  普通话（母语）, 粤语（入门水平）, 英语（中等水平）
  #v(0.1em)
  #text(weight: "bold", size: 1em)[期望薪资: ]
  HKD 25,000 - 30,000 月 
]

== 技能
#chiline()
- 在*前端开发*领域, 熟悉 JavaScript/TypeScript、React 和 Vue.js 生态系统, 以及 Next.js 等全栈框架的使用。掌握状态管理工具, 组件库的使用及性能优化技术。
- 具备*后端开发*基础知识, 能使用 Node.js 和 Express 搭建服务, 结合 MongoDB/MySQL 实现数据持久化, 并利用 Playwright 开发自动化测试和爬虫脚本。
- 了解*DevOps 实践*, 能够使用 Docker 进行容器化部署, 优化镜像体积, 配置 Nginx 服务器, 并通过 GitHub Actions 实现持续集成与部署流程。

== 工作经历
#chiline()

*Web3.0 Technology Limited* #h(1fr) 2024年11月 - 至今 \
前端开发工程师（实习） #h(1fr) 香港 \
- 为#link("https://daviddong.me/projects/dapp")[Central Node 55] 活动开发并优化Next.js管理后台, 设计实现用户配置、节点管理和奖励发放功能, 集成ECharts数据可视化模块, 使运营团队实时监控用户活跃度和地理分布, 提升决策效率。

- 构建完整的 Web3 用户客户端界面, 使用 Wagmi 与智能合约交互, 实现代币兑换质押和NFT奖励领取等核心功能.

- 设计并开发链上数据分析系统, 使用TypeScript编写自动化脚本处理跨平台数据源(XLSX、CSV、TXT), 实现钱包地址交叉验证和持币分析, 为市场策略调整提供数据支持,缩短分析周期从天级到小时级。

*北京大学长沙计算与数字经济研究院* #h(1fr) 2023年7月 - 2024年7月  \
前端开发工程师（全职） #h(1fr) 长沙 \
- 主导开发#link("https://daviddong.me/projects/chatbot")[AI智能诊疗助手前端系统], 从零构建React应用架构, 实现SSE流式传输、用户角色管理和文献检索等核心功能, 系统已在大型肿瘤专科三甲医院推广测试, 有效节约医生文献查阅时间, 提升诊疗效率。

- 跨部门协作开发#link("http://www.eeg-x.com/")[EEG-X智能脑电分析平台], 使用ECharts设计高精度脑电波形可视化组件, 实现波形高度自适应和时间线标注功能,平台已应用于癫痫诊断, 提高诊断准确率40%, 缩短分析时间60%。

- 负责智慧园区数据#link("https://daviddong.me/projects/data-visualization")[可视化系统开发], 运用Three.js构建交互式3D办公场景, 通过模型压缩和渲染优化技术, 将场景加载时间减少50%, 同时保持高质量视觉效果。

*腾讯音乐娱乐集团* #h(1fr) 2022年5月 - 2022年10月  \
前端开发工程师（实习） #h(1fr) 深圳 \

- 为QQ音乐、全民K歌和JOOX三大音乐平台开发直播间#link("https://daviddong.me/projects/tme")[互动游戏], 使用H5混合原生技术栈构建抽奖等活动页面, 提升用户参与度和停留时间。

- 作为核心开发者参与排行榜功能重构项目, 实现跨平台通用逻辑, 使用统一npm组件库整合三个产品线的相似功能, 减少代码冗余, 提高开发效率。


\
在业余时间, 我乐于探索新技术。开发了一个基于大语言模型的对话式PDF生成工具#link("https://daviddong.me/projects/autopdf")[*AutoPDF*]；以及轻量级开源评论系统#link("https://daviddong.me/projects/comments")[*Comments*]（已获50+ Star）。同时积极参与开源社区, 给*Node.js* #link("https://github.com/nodejs/node/pull/54569")[（PR\#54569）]和*React.js文档*#link("https://github.com/reactjs/react.dev/pull/6509")[（PR\#6509）]贡献过代码。

== 教育经历
#chiline()

*香港都会大学* - 计算机硕士（2024.9-2025.9）
\ 获得Katie Shu Sui Pui奖学金, 参与深度学习点云压缩研究项目，并发表相关论文。

*深圳大学* - 材料与化工硕士（2020.9-2023.6）\
获院二等奖学金，以第二作者身份发表了一篇锌空气电池方向论文，收录在 Carbon期刊。

*湖南工业大学* - 建筑环境与能源应用工程学士（2016.9-2020.6）
