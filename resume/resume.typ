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


#grid(
  columns: (1fr), // Changed to a single column layout for the header
  [
    = DONG, Haoyu (David) / 董皓宇
    #v(0.5em)
    #text(size: 10pt)[
      +852 46720879 / hidaviddong\@gmail.com / #link("https://github.com/hidaviddong")[GitHub] / #link("https://daviddong.me")[Website]\
      
      *Visa Status:* Student VISA holder available for part-time/intern (Jul-Sep); *IANG VISA expected this Sep*.\
      *Languages:* Putonghua (Native), Cantonese (Beginner), English (Intermediate).
    ]
  ]
)

== Technical Skills
#chiline()
- *Languages:* TypeScript, JavaScript, Python, SQL, HTML5, CSS3
- *Frontend:* React.js (Next.js), Vue.js, TailwindCSS, Vite
- *Backend:* Node.js, Express.js, PostgreSQL, MongoDB, Redis
- *Testing & DevOps:* Jest, Playwright, Docker, Git, CI/CD (GitHub Actions)

== Work Experience
#chiline()

*Web3.0 Technology Limited*  #h(1fr) Nov 2024 - Apr 2025, Hong Kong\
#link("https://daviddong.me/projects/dapp")[Decentralized Application] #h(1fr) Frontend Developer Intern \

- Integrated the DApp using ⁠Next.js and Wagmi, developing core features including token staking and withdrawal.
- Designed a Node.js script to analyze user staking behavior by querying transaction histories via the Polygon API.

*PKU-Changsha Institute for Computing and Digital Economy*  #h(1fr) Jul 2023 - Jul 2024, Changsha \
#link("https://daviddong.me/projects/chatbot")[LLM-based AI Medical Assistant] #h(1fr) Frontend Developer \
- Developed the frontend from scratch using React and Vite, implementing real-time AI responses with SSE.
- Managed streaming data flow by updating the React Query cache, ensuring a seamless, real-time user experience.
- Engineered the deployment pipeline, reducing Docker image size by 40% through multi-stage builds.

#link("https://daviddong.me/projects/data-visualization")[Smart Campus Visualization System]
- Developed an interactive 3D environment using Blender and Three.js and used pre-baking  to resolve rendering lag.
- Built an interactive map module using ECharts, featuring custom markers and data annotations.


*Tencent Music Entertainment* #h(1fr) May 2022 - Oct 2022, Shenzhen \
#link("https://daviddong.me/projects/tme")[QQ Music Live Room Development] #h(1fr) Frontend Developer Intern \

- Contributed to developing H5 live streaming event pages for core products QQ Music and WeSing.



== Side Projects
#chiline()

- #link("https://daviddong.me/projects/autopdf")[*AutoPDF*] - Conversational PDF generation tool based on Large Language Models.
- #link("https://daviddong.me/projects/polymarket-tg-agent")[*Polymarket-tg-agent*] - A Telegram AI Bot based on Polymarket API and Grok.
- #link("https://daviddong.me/projects/comments")[*Comments*] - Lightweight open-source commenting system, 50+ GitHub Stars.
- #link("https://daviddong.me/projects/98ui")[*98.ui*] - Windows 98 style UI component library.
- #link("https://daviddong.me/projects/watchbus")[*Watch Bus*] - An Apple Watch app for Hong Kong bus arrival time.
- An open-source contributor *including #link("https://github.com/reactjs/react.dev/pull/6509")[React.dev] and #link("https://github.com/nodejs/node/pull/54569")[Node.js]*



== Education
#chiline()

*Hong Kong Metropolitan University* - Master of Computing #h(1fr) Sep 2024 - Sep 2025, Hong Kong
\ Katie Shu Sui Pui Scholarship;  Research on deep learning-based point cloud compression.

*Shenzhen University* - Master of Engineering in Materials Science #h(1fr) Sep 2020 - Jun 2023, Shenzhen
\ Second-class Campus Scholarship; Research on metal-air battery, paper published in _Carbon_ .

*Hunan University of Technology* - Bachelor of Engineering in BEEE #h(1fr) Sep 2016 - Jun 2020, Zhuzhou


// 中文简历 - 简体中文
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
      +852 46720879 / hidaviddong\@gmail.com / #link("https://github.com/hidaviddong")[GitHub] / #link("https://daviddong.me")[Website]

      *个人简介*：男, 1999年出生于湖南益阳，现居香港。拥有三年前端开发经验，参与过大语言模型应用、去中心化应用、后台管理系统等多类项目，熟悉 *TypeScript、React.js、Vue.js* 等前 Web 开发技术，具备扎实的工程实践能力和团队协作能力。\

      *签证状况*：目前持香港学生签证（可实习/兼职，预计 *2025 年 9 月* 获得 IANG 签证）。\

      *语言能力*：普通话（母语），粤语（初级），英语（中级）。
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

== 技能
#chiline()
- *Languages:* TypeScript, JavaScript, Python, SQL, HTML5, CSS3
- *Frontend:* React.js (Next.js), Vue.js, TailwindCSS, Vite
- *Backend:* Node.js, Express.js, PostgreSQL, MongoDB, Redis
- *Testing & DevOps:* Jest, Playwright, Docker, Git, CI/CD (GitHub Actions)

== 工作经历
#chiline()

*Web3.0 Technology Limited* - 前端开发实习生 #h(1fr) 2024 年 11 月 - 2025 年 4 月，香港\
#link("https://daviddong.me/projects/dapp")[DApp去中心化应用]\
+ 负责基于 Next.js 和 Wagmi 集成去中心化应用，开发代币质押、提现前端核心功能模块。
+ 设计并实现 Node.js 脚本，通过调用查询 Polygon 链上历史交易数据，自动化分析用户链上质押行为。


*北京大学长沙计算与数字经济研究院* - 前端开发工程师 #h(1fr) 2023年7月 - 2024年7月，长沙 \
#link("https://daviddong.me/projects/chatbot")[基于大语言模型的 AI 诊疗助手]\
+ 从零搭建 AI 医疗助手前端，采用 React 与 Vite 架构，集成 SSE 实现 AI 实时流式回复，极大提升了用户交互体验。\
+ 利用 React Query 缓存机制，优化流式数据同步与界面实时更新，确保数据展示的流畅性和一致性。\
+ 优化部署流程，采用 Docker 多阶段构建，将镜像体积缩小 40%，显著提升了部署效率和资源利用率。\
#link("https://daviddong.me/projects/data-visualization")[智慧园区可视化系统]\
+ 使用 Blender 和 Three.js 搭建可交互 3D 场景，通过预烘焙技术解决渲染卡顿问题，提升系统性能。\
+ 基于 ECharts 开发园区数据可视化模块，实现自定义地图标记与数据注释，增强数据展示的直观性。

*腾讯音乐娱乐集团* - 前端开发实习生 #h(1fr)  2022年5月 - 2022年10月，深圳 \
#link("https://daviddong.me/projects/tme")[QQ 音乐直播间活动页开发]\
+ 参与 QQ 音乐、全民 K 歌等核心产品的 H5 直播活动页面开发，保障了高并发场景下的页面稳定性与用户体验。
== 个人项目
#chiline()
+ #link("https://daviddong.me/projects/autopdf")[*AutoPDF*] - 基于大语言模型的对话式PDF生成工具。
+ #link("https://daviddong.me/projects/polymarket-tg-agent")[*Polymarket-tg-agent*] - 基于 Polymarket API 和 Grok 的Telegram 机器人。
+ #link("https://daviddong.me/projects/comments")[*Comments*] - 轻量级开源评论系统，GitHub Star 50+，阮一峰周刊推荐。
+ #link("https://github.com/hidaviddong/98.ui")[*98.ui*] - 复刻Windows 98风格的前端UI组件库。
+ #link("https://daviddong.me/projects/watchbus")[*Watch Bus*] - Apple Watch App, 可以查看当前站台的巴士到站时间。
+ 积极贡献开源社区：*#link("https://github.com/reactjs/react.dev/pull/6509")[React.dev] 和 #link("https://github.com/nodejs/node/pull/54569")[Node.js]* 贡献者。

== 教育经历
#chiline()

*香港都会大学* - 计算机硕士 #h(1fr)2024年9月 - 2025年9月，香港
\ 入学前获得Katie Shu Sui Pui奖学金, 参与深度学习点云压缩研究项目，并发表相关论文。

*深圳大学* - 材料与化工硕士 #h(1fr) 2020年9月 - 2023年6月，深圳
\ 在校期间获得校园二等奖学金，参与金属空气电池研究项目，并发表论文收录在 Carbon期刊。

*湖南工业大学* - 建筑环境与能源应用工程学士 #h(1fr)2016年9月 - 2020年6月，株洲

// 中文简历 - 繁體中文
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

      男, 1999年出生於湖南益陽，現居香港。目前正在尋求一份軟件開發崗位。\
  
      我有三年前端開發經驗，參與過*大語言模型應用、去中心化應用、中後台管理系統*的開發。

      熟練掌握前端開發技術棧 *TypeScipt, React.js* 以及周邊生態的使用。具備基礎後端開發能力，能夠使用 *Node.js, Express* 構建 API 服務。了解 Docker 容器化工具以及CICD 的實踐。
    
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

== 工作經歷
#chiline()

*Web3.0 Technology Limited* - 前端開發實習生 #h(1fr) 2024 年 11 月 - 2025 年 4 月，香港\

*北京大學長沙計算與數字經濟研究院* - 前端開發工程師 #h(1fr) 2023年7月 - 2024年7月，長沙 \

*騰訊音樂娛樂集團* - 前端開發實習生 #h(1fr)  2022年5月 - 2022年10月，深圳 \

== 項目經歷
#chiline()

#link("https://daviddong.me/projects/dapp")[*DApp去中心化應用*] - Web3.0 Technology Limited #h(1fr) 2025 \
+ 主導應用路由重構：引入 Next.js App Router 替代舊有狀態驅動導航，顯著提升頁面初始加載速度並優化了代碼架構。
+ 改進智能合約交互體驗：在abitype 庫的基礎上自定義類型，實現了合約數據的具名屬性訪問 (e.g., `⁠res.id` vs ⁠`res[0]`)，大幅增強了代碼可讀性與類型安全性。

#link("https://daviddong.me/projects/chatbot")[*基於大語言模型的 AI 診療助手*] - 北京大學長沙計算與數字經濟研究院 #h(1fr) 2024 \
+ 從零主導前端架構與部署優化：獨立完成技術選型 (React, Vite, TailwindCSS, React Router, Jotai)，引入 Playwright 進行E2E測試，zod 進行用戶輸入和表單校驗。

+ 打造流暢AI對話核心體驗：運用SSE實現AI流式響應，並使用React Query樂觀更新解決數據同步延遲問題，使用 remark 解析生成的markdown及實現動態光標效果，全面提升用戶交互友好度。

+ 將項目進行容器化改造：利用Docker多階段構建技術，將鏡像從100MB顯著壓縮至20MB，實現高效部署。


#link("https://daviddong.me/projects/data-visualization")[*智慧園區可視化系統*] - 北京大學長沙計算與數字經濟研究院 #h(1fr) 2023 \
+ 構建交互式3D場景： 運用 Blender 與 Three.js 搭建可交互3D環境，通過預烘焙光照貼圖及模型精簡，成功解決渲染卡頓問題，確保了流暢幀率。
+ 開發可視化模塊： 基於 ECharts 實現地圖標記高亮、動態飛線及數據漸變等多種交互效果，顯著提升了園區運營數據的呈現直觀性。

#link("https://daviddong.me/projects/tme")[*QQ 音樂直播間活動頁開發*] - 騰訊音樂娛樂集團 #h(1fr) 2022\
+ 參與千萬級用戶平台直播H5活動頁開發： 為QQ音樂，全民K歌等核心產品開發交互式直播運營活動（如綠鑽抽獎，頁面小遊戲等），保障了活動的穩定性和用戶體驗。
+ 跨App核心組件統一： 針對QQ音樂/全民K歌/懶人聽書的直播間送禮榜單，重構為統一可配置React組件，顯著提升迭代效率、代碼復用率，並確保了三大平台視覺與交互的一致性。

*獨立開發項目* #h(1fr) 2023-2025\
+ #link("https://daviddong.me/projects/autopdf")[*AutoPDF*] - 基於大語言模型的對話式PDF生成工具。
+ #link("https://daviddong.me/projects/comments")[*Comments*] - 輕量級開源評論系統，GitHub Star 50+，阮一峰週刊推薦。
+ #link("https://github.com/hidaviddong/98.ui")[*98.ui*] - 復刻 Windows 98 風格的前端 UI 組件庫。
+ 積極參與開源社區：Node.js、React.js 貢獻者。


== 教育經歷
#chiline()

*香港都會大學* - 計算機碩士 #h(1fr)2024年9月 - 2025年9月，香港
\ 入學前獲得Katie Shu Sui Pui獎學金, 參與深度學習點雲壓縮研究項目，並發表相關論文。

*深圳大學* - 材料與化工碩士 #h(1fr) 2020年9月 - 2023年6月，深圳
\ 在校期間獲得校園二等獎學金，參與金屬空氣電池研究項目，並發表論文收錄在 Carbon期刊。

*湖南工業大學* - 建築環境與能源應用工程學士 #h(1fr)2016年9月 - 2020年6月，株洲
