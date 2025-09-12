



# 基础层

## 组件与基础语法

1. React 组件有哪几种定义方式？函数组件和类组件的核心区别是什么？
解题思路：先列举组件定义方式（函数式、类式、Fragment、Portal 等），再对比核心差异（状态管理、生命周期、性能、Hook 的影响）。
答案：
定义方式：函数组件（Function Component）、类组件（Class Component）、Fragment（片段组件）、Portal（门户组件）。
核心区别：
状态管理：类组件通过this.state和setState，函数组件通过useState/useReducer；
生命周期：类组件有完整生命周期钩子，函数组件通过useEffect统一处理副作用；
性能：类组件需手动实现shouldComponentUpdate，函数组件可用React.memo优化；
范式：函数组件基于 Hook 更简洁，类组件需继承React.Component。

2. JSX 的本质是什么？为什么自定义组件必须首字母大写？
解题思路：解释 JSX 编译过程（Babel 转译为React.createElement），说明大小写规则与原生标签的区分逻辑。
答案：
JSX 本质是语法糖，最终会被编译为React.createElement(type, props, children)函数调用。
首字母大写是为了区分原生 HTML 标签（小写，如div）和自定义组件（大写，如MyComponent），React 通过首字母判断是否为用户定义组件，避免与 HTML 标签冲突。

3. 类组件中setState的第二个参数有什么作用？函数组件如何实现类似功能？
解题思路：明确setState异步特性，第二个参数的回调时机，对比函数组件的useEffect。
答案：
第二个参数是状态更新后的回调函数，在组件重新渲染且 DOM 更新后执行，用于依赖最新状态的操作（如console.log(this.state)）。
函数组件中，可通过useEffect监听状态变化，在依赖项中包含目标状态，实现相同效果：
javascript
useEffect(() => {
  // 状态更新后的回调逻辑
}, [state]);

4. useState的惰性初始化（lazy initialization）如何实现？什么场景下需要用到？
解题思路：解释初始化函数参数，避免重复计算，举例复杂初始状态的场景。
答案：
当useState的初始值是一个函数时（如useState(() => expensiveComputation())），会在组件首次渲染时执行该函数，后续重新渲染时跳过，实现惰性初始化。
适用场景：初始状态需要复杂计算（如从 URL 解析、读取本地存储），或初始值依赖 props 且可能重复渲染时，避免重复计算提升性能。

## 核心机制与生态
5. React 事件系统为什么要用合成事件（Synthetic Event）？和原生事件的绑定 / 解绑有何不同？
解题思路：从跨平台、性能、内存管理角度分析合成事件的优势，对比原生事件的绑定方式。
答案：
合成事件是 React 封装的跨浏览器兼容的事件系统，优势包括：
统一事件命名（如onClick替代onclick）和属性标准化；
基于事件委托（在根节点document绑定事件监听器），减少内存开销；
自动绑定this到组件实例（类组件中无需手动绑定）。
绑定 / 解绑：合成事件通过addEventListener统一绑定到文档，原生事件需手动在componentDidMount绑定、componentWillUnmount解绑，且需注意内存泄漏。

6. React.memo和类组件的shouldComponentUpdate的区别是什么？使用时需要注意什么陷阱？
解题思路：对比两者的功能、实现方式、浅比较的局限性，说明依赖对象 / 数组时的问题。
答案：
区别：
React.memo是函数组件的高阶组件，浅比较 props 决定是否重渲染；
shouldComponentUpdate是类组件生命周期方法，可自定义比较逻辑（深比较或部分字段比较）。
陷阱：两者默认均为浅比较，若 props 包含对象 / 数组，引用不变但内容变化时，子组件不会更新。需传入自定义比较函数（如React.memo(component, areEqual)）或使用useCallback缓存回调函数。

7. Redux 的三大原则是什么？redux-thunk解决了什么问题？
解题思路：回忆 Redux 核心设计，说明同步 action 的局限，thunk 如何支持异步。
答案：
三大原则：
单一数据源（整个应用状态存储在单个 store 中）；
状态只读（只能通过 dispatch action 修改状态）；
纯函数修改（reducer 必须是纯函数，相同输入返回相同输出）。
redux-thunk解决了 Redux 原生仅支持同步 action 的问题，允许 action creator 返回函数（thunk），在函数中可以执行异步操作（如 API 调用），再 dispatch 同步 action。

8. useRef和createRef的区别是什么？何时需要使用useRef保存可变值？
解题思路：对比两者的适用场景（类组件 vs 函数组件），说明useRef的跨渲染周期特性。
答案：
createRef是类组件中创建 DOM 引用的方法，返回一个{ current: null }的对象；
useRef是函数组件的 Hook，功能更强大：既可引用 DOM，也可保存任意可变值（如定时器、最新回调函数），且其current属性在组件重新渲染时保持不变。
当需要跨渲染周期保存值（如记录上一次的状态、避免闭包中捕获旧值）时，使用useRef，例如：
javascript
const prevState = useRef();
useEffect(() => {
  prevState.current = state; // 保存上一次的state
}, [state]);

## 组件生命周期与更新
9. 类组件的componentWillMount和componentWillUpdate为什么被废弃？替代方案是什么？
解题思路：结合异步渲染（Fiber 架构）解释生命周期不稳定性，说明替代方案的设计。
答案：
废弃原因：Fiber 架构引入异步渲染，组件可能在渲染过程中被暂停 / 中断，导致componentWillMount/componentWillUpdate在一次更新中多次调用，破坏数据一致性。
替代方案：
componentWillMount → useEffect（函数组件）或componentDidMount（类组件，副作用统一在挂载后执行）；
componentWillUpdate → 移除，逻辑移至getDerivedStateFromProps（静态方法，用于根据 props 更新 state）或useEffect（依赖 props 变化）。

10. 父组件更新时，子组件一定会重新渲染吗？哪些情况会导致子组件不必要的重渲染？
解题思路：分析组件更新的依赖条件，区分 props 变化、状态变化、纯函数组件特性。
答案：
不一定。子组件是否重渲染取决于：
类组件：未实现shouldComponentUpdate或返回true；
函数组件：未使用React.memo且 props 浅比较变化，或内部状态变化。
不必要重渲染场景：
父组件状态变化但未传递给子组件；
父组件渲染时创建新的回调函数 / 对象作为 props（如<Child onSubmit={() => {}} />），导致 props 引用变化；
未对纯函数组件使用React.memo或类组件未优化shouldComponentUpdate。

# 进阶层
## 性能优化与高级 Hook
11. useCallback和useMemo的核心作用是什么？依赖数组不正确会导致什么问题？
解题思路：区分两者的缓存目标（函数 vs 值），说明依赖项不完整或多余的影响。
答案：
useCallback：缓存函数引用，避免子组件因函数变化而不必要重渲染；
useMemo：缓存计算结果，避免重复执行昂贵的计算逻辑。
依赖数组问题：
缺失依赖项：导致使用闭包中的旧值（如异步回调中访问过时状态）；
包含不必要依赖：缓存失效，失去性能优化意义；
依赖对象 / 数组：浅比较导致即使内容不变，只要引用变化就重新计算（需用useRef或 immer 处理不可变数据）。

12. 虚拟 DOM 的 diff 算法遵循什么策略？为什么只对比同层节点？
解题思路：解释 diff 的三大策略（同层比较、标签类型、key 属性），说明时间复杂度优化。
答案：
diff 算法策略：
同层比较：只对比同一层级的节点，不同层级节点直接删除重建（避免跨层 diff 的 O (n^3) 复杂度，优化为 O (n)）；
标签类型判断：若标签类型不同（如div变p），直接删除旧节点并创建新节点；
key 属性：通过唯一 key 标识节点，允许移动 / 复用节点，避免重新渲染所有子节点。
只对比同层节点是因为 DOM 树的层级结构通常稳定（如 Header、Content、Footer），跨层变动少，牺牲部分场景（如表格行跨层移动）换取性能提升。

13. 如何避免useEffect中的内存泄漏？清除副作用时为什么需要最新的状态？
解题思路：说明副作用包含订阅、定时器等，清除函数的作用，闭包导致的旧状态问题。
答案：
避免内存泄漏：在useEffect中返回清除函数（如取消订阅、清除定时器），在组件卸载或依赖项变化前执行。
清除时需要最新状态的原因：useEffect捕获的是渲染时的闭包状态，若清除逻辑依赖状态（如取消请求的 ID），旧闭包可能持有已卸载组件的过时状态，导致逻辑错误。例如：
javascript
useEffect(() => {
  const id = setInterval(() => {
    console.log(state); // 闭包捕获的是创建时的state
  }, 1000);
  return () => clearInterval(id); // 清除正确的定时器
}, [state]); // 依赖state变化时重新创建定时器，清除旧定时器

14. 对比React.lazy+Suspense和React.memo的适用场景，前者的局限性是什么？
解题思路：区分代码分割与组件性能优化，说明 Suspense 的兼容性和加载状态处理。
答案：
React.lazy+Suspense：用于动态导入组件，实现代码分割（按需加载），适用于非关键路径组件（如弹窗、路由组件），需配合webpack等打包工具。
React.memo：用于缓存函数组件，避免因 props 浅变化导致的不必要重渲染，适用于纯展示组件。
React.lazy局限性：
仅支持函数组件，不支持类组件；
不能在服务端渲染（SSR）中使用；
加载状态需通过Suspense的fallback指定，且同一层级只能有一个Suspense。


## 状态管理与架构设计

15. React Context 的设计初衷是什么？频繁更新的上下文会带来什么性能问题？如何优化？
解题思路：解释跨组件通信痛点，上下文更新的影响范围，分层设计优化方法。
答案：
设计初衷：解决 props 逐层传递的冗余问题，实现跨层级组件通信（如主题、用户登录状态）。
性能问题：当上下文值变化时，所有消费该上下文的组件（即使未使用变化的字段）都会重新渲染，导致 “涟漪效应”。
优化方案：
细分上下文：将频繁变化和稳定的数据拆分到不同上下文；
使用中间层组件：通过状态提升，将变化状态的消费组件包裹在最近的提供者中；
配合useMemo/useCallback缓存上下文值，避免不必要的重渲染。


16. 为什么 Redux 需要中间件？对比redux-thunk和redux-saga的适用场景。
解题思路：说明原生 Redux 的同步限制，中间件的扩展能力，对比两者的异步处理模式。
答案：
Redux 中间件用于扩展 dispatch 功能，原生 Redux 仅支持同步 dispatch，异步操作（如 API 调用）需通过中间件实现。
redux-thunk：最简单的中间件，允许 action creator 返回函数，直接处理异步逻辑，适合简单异步场景（如单步 API 调用）。
redux-saga：基于 Generator 函数的复杂中间件，将异步逻辑分离为独立的 saga 任务，支持取消、重试、并发等高级功能，适合复杂异步流程（如表单提交防抖、多请求并行）。

17. 类组件的this.setState({ count: this.state.count + 1 })和函数组件的setCount(prev => prev + 1)有什么本质区别？
解题思路：分析状态更新的异步性，函数式更新的必要性，避免闭包中的旧状态问题。
答案：
本质区别：
类组件中，setState的第一个参数若为对象，会与当前状态合并，且在异步更新时可能基于旧状态（如批量更新时）；
函数组件中，setState的函数式更新（(prevState) => newState）接收最新的前一个状态，确保状态更新基于最新值，避免竞态条件（如多个快速连续的更新）。
场景举例：若多个setState调用依赖前一次的状态，类组件需使用函数式更新（setState((prev) => ({ count: prev.count + 1 }))），而函数组件推荐始终使用函数式更新以保证可靠性。

18. 错误边界（Error Boundary）能捕获哪些错误？为什么不能捕获事件处理函数中的错误？
解题思路：明确错误边界的作用范围，区分渲染期错误和运行时错误。
答案：
错误边界（实现getDerivedStateFromError或componentDidCatch的类组件）能捕获：
渲染期间的错误（如组件渲染时的 JSX 错误）；
生命周期函数中的错误（如componentDidMount中的异步请求错误）；
子组件传递的错误（不包括自身错误）。
无法捕获事件处理函数中的错误，因为事件处理函数属于 React 合成事件回调，运行在浏览器事件循环中，不在 React 的渲染更新流程内，需手动用try/catch捕获。

## 高级特性与生态
19. 自定义 Hook 为什么必须在组件顶层调用？违背规则会导致什么问题？
解题思路：解释 Hook 的链表结构，嵌套调用对依赖数组的影响。
答案：
必须顶层调用的原因：React 通过维护一个 Hook 链表来跟踪组件的状态，每次渲染时按顺序调用 Hook，确保状态与 Hook 一一对应。
违背规则会导致：
状态混乱：如条件语句中调用 Hook，不同渲染周期 Hook 顺序变化，导致useState获取错误的状态；
依赖数组失效：嵌套调用时，依赖项的顺序可能改变，引发性能问题或逻辑错误。

20. 服务端渲染（SSR）中，React 如何解决 “注水（Hydration）” 过程中的匹配问题？
解题思路：说明 SSR 的基本流程，客户端与服务端 HTML 的差异可能导致的问题。
答案：
注水过程是客户端 React 将服务端生成的 HTML 与客户端 JS 生成的虚拟 DOM 进行匹配，绑定事件处理器的过程。
匹配问题及解决方案：
标签不匹配：服务端和客户端渲染的标签类型不同（如服务端渲染div，客户端渲染p），需确保条件渲染逻辑一致；
事件处理不一致：服务端不执行事件回调，客户端需正确绑定事件（避免在 SSR 中使用依赖 DOM 的 API，如window、document）；
数据获取时机：使用getInitialProps（Next.js）或生命周期方法（如componentDidMount）在客户端重新获取数据，避免服务端数据与客户端状态冲突。


# 专家层
## 原理剖析与跨框架对比
21. 简述 React 调和（Reconciliation）过程的核心步骤，Fiber 架构如何解决同步渲染的阻塞问题？
解题思路：分阶段描述调和过程，对比同步更新与 Fiber 的分片处理。
答案：
调和过程核心步骤：
生成新虚拟 DOM：根据状态变化创建新的虚拟 DOM 树；
diff 算法对比：逐层对比新旧虚拟 DOM，生成差异补丁（effect list）；
提交更新（commit phase）：将差异应用到真实 DOM。
Fiber 架构改进：
将同步阻塞的调和过程拆分为可中断的 “任务”（分片处理），允许浏览器在任务间隙处理用户输入、动画等，避免界面卡死；
引入优先级机制（如交互事件优先级高于异步数据加载），优先处理高优先级任务，提升响应速度；
使用双缓存技术（current fiber 和 workInProgress fiber），确保渲染过程可回退和重试。

22. 对比 React 和 Vue 的响应式原理：React 的状态更新为何需要setState/useState，而 Vue 能自动追踪依赖？
解题思路：分析两者状态管理的底层实现（不可变数据 vs Proxy/Object.defineProperty）。
答案：
React：采用不可变数据模式，状态变化需通过setState/useState显式触发，React 通过比较新旧状态确定更新范围。状态更新是异步的，依赖批处理优化性能。
Vue：通过 Proxy（Vue 3）或 Object.defineProperty（Vue 2）对数据进行劫持，自动追踪依赖（收集哪些组件使用了哪些数据），当数据变化时主动通知相关组件重新渲染。
核心差异：
React 依赖手动触发更新，适合复杂逻辑下的细粒度控制；
Vue 自动响应数据变化，语法更简洁，适合快速开发，但对不可变数据的支持较弱（需手动处理数组 / 对象变更）。

23. React 的虚拟 DOM 和 Vue 的虚拟 DOM 在实现上有哪些主要区别？为什么说 Vue 的渲染器更轻量？
解题思路：对比 diff 算法、静态标记、渲染器设计，说明性能优化方向。
答案：
主要区别：
diff 算法：
React：基于同层节点对比，优先对比 key 和标签类型，复杂度 O (n)；
Vue：在 React 基础上增加 “静态标记”（static flag），对静态节点（无状态变化的节点）跳过 diff，提升效率。
虚拟 DOM 结构：
React 的虚拟 DOM 是纯 JS 对象，包含完整的节点信息；
Vue 的虚拟 DOM（VNode）更轻量化，通过shapeFlag标识节点类型（元素、组件、文本等），减少内存占用。
渲染器设计：
Vue 的渲染器支持 “编译时优化”，将模板编译为渲染函数时，提前确定静态节点和动态节点，运行时只需处理动态部分；
React 依赖运行时 diff，对所有节点一视同仁（除非使用React.memo等优化）。
Vue 渲染器更轻量的原因：通过编译阶段的静态分析，减少运行时的计算量，尤其适合模板驱动的场景（如表单、列表）。

24. 从设计哲学角度，分析 React 的 “一切皆组件” 和 Vue 的 “组件 + 模板” 的异同，各适合什么场景？
解题思路：对比组件定义方式、逻辑组织、学习曲线，结合生态举例。
答案：
React（JSX + 组件）：
哲学：用 JavaScript 表达 UI，逻辑与视图高度融合，组件即函数 / 类，可通过 Hook 灵活组合逻辑。
优势：适合复杂交互逻辑（如可视化编辑器、动态表单），生态强大（Next.js、Gatsby 等），适合大型团队定制化开发。
劣势：学习曲线较陡（需掌握 JSX、Hook、状态管理模式），模板语法不够直观。
Vue（模板 + 组件）：
哲学：分离模板、脚本、样式，接近传统 HTML 开发，逻辑通过声明式语法表达。
优势：上手门槛低，适合快速开发中后台管理系统、移动端应用（配合 uniapp），模板语法对新手友好。
劣势：复杂逻辑需通过计算属性、侦听器实现，大型项目的状态管理不如 React 灵活（依赖 Vuex）。
总结：React 适合需要高度定制化和逻辑复用的场景，Vue 适合快速开发和模板驱动的场景。

25. 在并发模式（Concurrency Mode）下，useTransition和suspense解决了什么问题？与 Vue 的异步组件有何异同？
解题思路：解释 React 的优先级处理，对比 Vue 的异步组件实现。
答案：
React useTransition：将非紧急更新（如列表过滤、数据加载）标记为过渡任务，允许高优先级任务（如用户输入）中断其渲染，保持界面响应。
React Suspense：处理异步加载组件 / 数据，在等待期间显示加载状态，支持组件级的加载状态管理，配合lazy实现代码分割。
解决的问题：在复杂交互中避免长任务阻塞主线程，提升用户体验。
与 Vue 异步组件的异同：
相同点：均支持异步加载组件，显示加载状态；
不同点：
React 的并发模式基于 Fiber 架构，支持任务中断和恢复，优先级处理更细粒度；
Vue 的异步组件通过defineAsyncComponent实现，本质是 Promise 加载组件，不涉及任务分片，适合简单异步场景。
总结：React 的并发特性是架构级优化，适合大型交互密集型应用；Vue 的异步组件是语法糖级支持，轻量但功能有限。

# 补充

26. vue的computed思想 在react中有应用吗
Vue computed 的核心特性：
- 响应式依赖追踪，自动追踪计算过程中使用的响应式数据（如 data 中的属性），仅当依赖项变化时重新计算。
- 缓存机制：计算结果会被缓存，避免无意义的重复计算（性能优化）
- 纯函数特性：计算逻辑应为纯函数，仅依赖输入数据，无副作用。

React 中对应的解决方案：useMemo

特性	Vue computed	React useMemo
依赖管理	自动追踪响应式依赖	需手动声明依赖数组
缓存机制	自动缓存结果	自动缓存结果
触发时机	依赖项变化时重新计算	依赖项变化时重新计算
返回值	直接返回计算值	需通过回调函数返回计算值
副作用	不允许副作用（应使用 watch）	允许副作用，但推荐避免（纯函数）

27. watch在哪些方面补充了computed
- 副作用处理: 如，如 API 调用、DOM 操作、日志记录
- 异步操作支持
- 深度监听与特定值变化
- 性能优化：延迟执行与防抖节流