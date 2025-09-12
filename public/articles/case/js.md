


# js事件循环 event loop
事件循环是 JavaScript 实现**异步非阻塞**编程的核心机制。

## 概念
执行栈

同步任务

异步任务分类：宏任务（MacroTask）与微任务（MicroTask）
1. 宏任务（队列）：
    - 常见 API：setTimeout、setInterval、setImmediate（Node.js）、I/O、UI渲染。
    - 特点：每个宏任务结束后，会检查微任务队列并执行所有微任务，再进行 UI 渲染。

2. 微任务（队列）：
    - 常见 API：Promise.then、MutationObserver、process.nextTick（Node.js）。
    - 特点：微任务队列是先进先出的。在当前宏任务执行完毕后、下一个宏任务开始前，立即执行微任务队列中的所有任务。

## 事件循环的执行流程
1. 初始阶段：执行**同步代码**，同步任务全部完成后，**栈为空**。
2. 处理微任务：
若微任务队列中有任务，依次执行所有微任务（**直至队列为空**）。
过程中若新增微任务，继续加入队列并执行（微任务会被连续执行，直到清空）。
3. 处理宏任务：
从宏任务队列中取出第一个任务执行（如setTimeout回调）。
执行完毕后，再次检查并清空微任务队列。
循环往复：重复步骤 2-3，形成事件循环。

## 关键规则
1. 微任务优先级高于宏任务，且在同一宏任务周期内，微任务会被优先处理。
2. **UI 渲染时机**：通常在宏任务或微任务执行完毕后，**由浏览器决定是否进行渲染（例如在事件循环的空闲期）**。

## 设计思想体现
1. react的Fiber（纤维）分片任务/可中断的小任务，利用事件循环的空闲时间（通过requestIdleCallback）执行任务，避免阻塞主线程

```js
// 同步代码中的setState会被批量处理（非立即更新）
function handleClick() {
  setState(prev => prev + 1); // 放入更新队列
  setState(prev => prev + 1); // 合并批量更新
}





useEffect(() => {
  setTimeout(() => {
    console.log('宏任务中的副作用'); // 在后续宏任务中执行
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('微任务中的副作用'); // 在当前微任务队列末尾执行
  });
}, [依赖项]);
```


2. Vue 通过异步更新队列和nextTick 机制，结合事件循环实现高效响应式更新

```js
watch: {
  msg(newVal) {
    // 此时DOM尚未更新
    console.log(this.$el.textContent); // 旧值
    
    this.$nextTick(() => {
      console.log(this.$el.textContent); // 新值（微任务中执行）
    });
  }
}
```


为什么vue的nextTick可以获取到更新后的dom元素的尺寸？
nextTick 的核心逻辑是将回调函数延迟到 DOM 更新完成后 执行，其实现依赖于事件循环的异步机制：
- 回调函数的执行时机：nextTick 会将回调函数加入一个 异步队列（如通过 Promise.then 或 setTimeout），确保该回调在 **当前事件循环的所有同步任务执行完毕后** 才会运行。
此时，Vue 的更新队列已执行完毕，DOM 已完成渲染，因此可以获取到更新后的 DOM 状态（包括尺寸）。

Vue 将 DOM 更新操作包装成微任务（如 Promise.then），放入 微任务队列。
同步代码执行完毕后，事件循环会先清空 微任务队列：
- 执行 Vue 的更新逻辑，完成 DOM 渲染。
- 执行 nextTick 中通过 Promise.then 注册的回调函数（此时 DOM 已更新）
若 nextTick 降级使用 setTimeout，则回调会进入 宏任务队列，在更晚的时机执行（但仍在 DOM 更新后）。


# 