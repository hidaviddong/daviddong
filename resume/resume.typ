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
    #text(size: 10pt )[
      +852 46720879 / hidaviddong\@gmail.com / #link("https://github.com/hidaviddong")[GitHub] / #link("https://daviddong.me")[Website]\
      
      With three years of front-end development experience, I have contributed to projects in *Large Language Model Applications, Decentralized Applications, and Admin Dashboard Systems*.\
      Proficient in front-end technologies including *TypeScript, React.js* and its ecosystem. Possess foundational back-end skills, capable of building APIs with *Node.js and Express*. Familiar with Docker containerization and CI/CD practices.

      *Visa Status:* IANG and available for work from Sep 2025.\
      *Languages:* Putonghua (Native), Cantonese (Beginner), English (Intermediate).

    ]
  ]
)

== Work Experience
#chiline()

*Web3.0 Technology Limited* - Frontend Developer Intern #h(1fr) Nov 2024 - Apr 2025, Hong Kong\

*PKU-Changsha Institute for Computing and Digital Economy* - Frontend Developer #h(1fr) Jul 2023 - Jul 2024, Changsha \

*Tencent Music Entertainment* - Frontend Developer Intern #h(1fr) May 2022 - Oct 2022, Shenzhen \

== Projects
#chiline()

#link("https://daviddong.me/projects/dapp")[*Decentralized Application (dApp)*] - Web3.0 Technology Limited #h(1fr) 2025 \
+ Replaced legacy state-driven navigation with Next.js App Router, improving initial page load speed and optimizing code architecture.
+ Customized types based on the abitype library, enabling named attribute access for contract data (e.g., ⁠res.id vs ⁠res[0]), enhanced code readability and type safety.

#link("https://daviddong.me/projects/chatbot")[*LLM-based AI Medical Assistant*] - PKU-Changsha Institute for Computing and Digital Economy #h(1fr) 2024 \
+ Build front-end architecture from scratch, tech stack (React, Vite, TailwindCSS, React Router, Jotai), Playwright for E2E testing, zod for user input/form validation. 
+ Implemented AI streaming responses using SSE, used React Query optimistic updates to resolve data synchronization latency, enhancing user interaction.
+ Using Docker, significantly reducing image size from 100MB to 20MB using multi-stage builds for efficient deployment.

#link("https://daviddong.me/projects/data-visualization")[*Smart Campus Visualization System*] - PKU-Changsha Institute for Computing and Digital Economy #h(1fr) 2023 \
+ Used Blender and Three.js to create an interactive 3D environment. Successfully resolved rendering lag and ensured smooth frame rates by pre-baking lightmaps and simplifying models. 
+  Implemented interactive effects like map highlighting, dynamic lines using ECharts,  improve data intuitiveness

#link("https://daviddong.me/projects/tme")[*QQ Music Live Room Development*] - Tencent Music Entertainment Group #h(1fr) 2022\
+ Developed H5 live streaming pages: Core products like QQ Music and WeSing (10M+ users), ensuring event stability and user experience. 
+ Refactored the live room gifting page for QQ Music, WeSing, and Kuwo Music into a unified, configurable React component, Improved efficiency and code reusability.

*Personal Projects* #h(1fr) 2023-2025\
+ #link("https://daviddong.me/projects/autopdf")[*AutoPDF*] - Conversational PDF generation tool based on Large Language Models.
+ #link("https://daviddong.me/projects/comments")[*Comments*] - Lightweight open-source commenting system, 50+ GitHub Stars.
+ Open Source Contributor: Contributions to Node.js and React.js.

== Education
#chiline()

*Hong Kong Metropolitan University* - Master of Computing #h(1fr) Sep 2024 - Sep 2025, Hong Kong
\ Katie Shu Sui Pui Scholarship;  Research on deep learning-based point cloud compression.

*Shenzhen University* - Master of Engineering in Materials Science #h(1fr) Sep 2020 - Jun 2023, Shenzhen
\ Second-class Campus Scholarship; Research on metal-air battery, paper published in *Carbon* .

*Hunan University of Technology* - Bachelor of Engineering in BEEE #h(1fr) Sep 2016 - Jun 2020, Zhuzhou


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
+ 积极参与开源社区：Node.js、React.js 贡献者。


== 教育经历
#chiline()

*香港都会大学* - 计算机硕士 #h(1fr)2024年9月 - 2025年9月，香港
\ 入学前获得Katie Shu Sui Pui奖学金, 参与深度学习点云压缩研究项目，并发表相关论文。

*深圳大学* - 材料与化工硕士 #h(1fr) 2020年9月 - 2023年6月，深圳
\ 在校期间获得校园二等奖学金，参与金属空气电池研究项目，并发表论文收录在 Carbon期刊。

*湖南工业大学* - 建筑环境与能源应用工程学士 #h(1fr)2016年9月 - 2020年6月，株洲
