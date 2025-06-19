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
      
      *Visa Status:* IANG and available for work from Sep 2025.\
      *Languages:* Putonghua (Native), Cantonese (Beginner), English (Intermediate).

      #additional-block[
  #text(weight: "bold")[Summary]\
   Master of Computing student with a strong foundation in Web Development.  *An open-source contributor with merged pull requests in world-class projects, including #link("https://github.com/reactjs/react.dev/pull/6509")[React.js] and #link("https://github.com/nodejs/node/pull/54569")[Node.js] *. Seeking a Frontend or Full-Stack Developer role to build high-quality web applications.
]
    ]
  ]
)

== Technical Skills
#chiline()
- *Languages:* TypeScript, JavaScript, Python, HTML5, CSS3
- *Frontend:* React.js, Next.js, Vue.js, Vite, TailwindCSS, ECharts, Three.js
- *Backend:* Express.js, Node.js
- *Databases:* PostgreSQL, MongoDB
- *Tools & DevOps:* Git, Docker, CI/CD (GitHub Actions, Jenkins)


== Work Experience
#chiline()

*Web3.0 Technology Limited*  #h(1fr) Nov 2024 - Apr 2025, Hong Kong\
#link("https://daviddong.me/projects/dapp")[Decentralized Application] #h(1fr) Frontend Developer Intern \

+ Replaced state-driven navigation with Next.js App Router, optimizing load speed by 20% and bundle size by 40%.
+ Customized types based on the abitype library, enabling named attribute access for read contract data.

*PKU-Changsha Institute for Computing and Digital Economy*  #h(1fr) Jul 2023 - Jul 2024, Changsha \
#link("https://daviddong.me/projects/chatbot")[LLM-based AI Medical Assistant] #h(1fr) Frontend Developer \
+ Built front-end architecture from scratch, implemented AI streaming responses using SSE.
+ Used React Query optimistic updates to resolve data synchronization latency.
+ Reduced 40% image size using Docker multi-stage for efficient deployment.

#link("https://daviddong.me/projects/data-visualization")[Smart Campus Visualization System]
+ Developed an interactive 3D environment using Blender and Three.js. 
+ Used pre-baking lightmaps to resolve rendering lag and ensured smooth frame rates. 
+ Used Echarts to implement interactive effects like map highlighting and dynamic lines.


*Tencent Music Entertainment* #h(1fr) May 2022 - Oct 2022, Shenzhen \
#link("https://daviddong.me/projects/tme")[QQ Music Live Room Development] #h(1fr) Frontend Developer Intern \

Contributed to developing H5 live streaming event pages for core products QQ Music and WeSing (10M+ users).



== Side Projects
#chiline()

+ #link("https://daviddong.me/projects/autopdf")[*AutoPDF*] - Conversational PDF generation tool based on Large Language Models.
+ #link("https://daviddong.me/projects/comments")[*Comments*] - Lightweight open-source commenting system, 50+ GitHub Stars.
+ #link("https://github.com/hidaviddong/98.ui")[*98.ui*] - Windows 98 style UI component library.
+ #link("https://github.com/hidaviddong/bus-station")[*Watch Bus*] - An Apple Watch app for Hong Kong bus arrival time.

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
      19926690273 / hidaviddong\@gmail.com / #link("https://github.com/hidaviddong")[GitHub] / #link("https://daviddong.me")[Website]

      男, 1999年出生于湖南益阳，现居香港。目前正在寻求一份软件开发岗位。\
  
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
+ 改进智能合约交互体验：在abitype 库的基础上自定义类型，实现了合约数据的具名属性访问 (e.g., `⁠res.id` vs ⁠`res[0]`)，大幅增强了代码可读性与类型安全性。

#link("https://daviddong.me/projects/chatbot")[*基于大语言模型的 AI 诊疗助手*] - 北京大学长沙计算与数字经济研究院 #h(1fr) 2024 \
+ 从零主导前端架构与部署优化：独立完成技术选型 (React, Vite, TailwindCSS, React Router, Jotai)，引入 Playwright 进行E2E测试，zod 进行用户输入和表单校验。

+ 打造流畅AI对话核心体验：运用SSE实现AI流式响应，并使用React Query乐观更新解决数据同步延迟问题，使用 remark 解析生成的markdown及实现动态光标效果，全面提升用户交互友好度。

+ 将项目进行容器化改造：利用Docker多阶段构建技术，将镜像从100MB显著压缩至20MB，实现高效部署。


#link("https://daviddong.me/projects/data-visualization")[*智慧园区可视化系统*] - 北京大学长沙计算与数字经济研究院 #h(1fr) 2023 \
+ 构建交互式3D场景： 运用 Blender 与 Three.js 搭建可交互3D环境，通过预烘焙光照贴图及模型精简，成功解决渲染卡顿问题，确保了流畅帧率。
+ 开发可视化模块： 基于 ECharts 实现地图标记高亮、动态飞线及数据渐变等多种交互效果，显著提升了园区运营数据的呈现直观性。

#link("https://daviddong.me/projects/tme")[*QQ 音乐直播间活动页开发*] - 腾讯音乐娱乐集团 #h(1fr) 2022\
+ 参与千万级用户平台直播H5活动页开发： 为QQ音乐，全民K歌等核心产品开发交互式直播运营活动（如绿钻抽奖，页面小游戏等），保障了活动的稳定性和用户体验。
+ 跨App核心组件统一： 针对QQ音乐/全民K歌/懒人听书的直播间送礼榜单，重构为统一可配置React组件，显著提升迭代效率、代码复用率，并确保了三大平台视觉与交互的一致性。

*独立开发项目* #h(1fr) 2023-2025\
+ #link("https://daviddong.me/projects/autopdf")[*AutoPDF*] - 基于大语言模型的对话式PDF生成工具。
+ #link("https://daviddong.me/projects/comments")[*Comments*] - 轻量级开源评论系统，GitHub Star 50+，阮一峰周刊推荐。
+ #link("https://github.com/hidaviddong/98.ui")[*98.ui*] - 复刻Windows 98风格的前端UI组件库。
+ 积极参与开源社区：Node.js、React.js 贡献者。


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
