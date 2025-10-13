---
title: 深入理解 JavaScript 事件循环
description: 详细解析 JavaScript 的事件循环机制，包括宏任务、微任务、执行栈等核心概念
date: 2023-12-28
category: JavaScript
tags: [JavaScript, 异步编程, 事件循环]
author: Geek Developer
readingTime: 15
---

# 深入理解 JavaScript 事件循环

事件循环是 JavaScript 异步编程的核心机制。理解它对于编写高效的异步代码至关重要。

## 执行栈（Call Stack）

JavaScript 是单线程的，所有的代码都在执行栈中运行：

```javascript
function first() {
  console.log('First')
  second()
}

function second() {
  console.log('Second')
}

first()
// First
// Second
```

## 任务队列（Task Queue）

### 宏任务（Macro Tasks）

- setTimeout
- setInterval
- setImmediate (Node.js)
- I/O 操作

### 微任务（Micro Tasks）

- Promise.then/catch/finally
- MutationObserver
- queueMicrotask

## 事件循环的执行顺序

1. 执行同步代码
2. 清空微任务队列
3. 执行一个宏任务
4. 清空微任务队列
5. 重复步骤3-4

```javascript
console.log('1')

setTimeout(() => {
  console.log('2')
  Promise.resolve().then(() => console.log('3'))
}, 0)

Promise.resolve().then(() => {
  console.log('4')
  setTimeout(() => console.log('5'), 0)
})

console.log('6')

// 输出顺序：1, 6, 4, 2, 3, 5
```

## async/await 与事件循环

`async/await` 是 Promise 的语法糖：

```javascript
async function example() {
  console.log('1')

  await Promise.resolve()
  console.log('2')  // 相当于 .then(() => console.log('2'))

  await Promise.resolve()
  console.log('3')
}

example()
console.log('4')

// 输出：1, 4, 2, 3
```

## 实战应用

### 优化长任务

将长任务分割成多个小任务：

```javascript
async function processLargeArray(array) {
  for (let i = 0; i < array.length; i++) {
    processItem(array[i])

    // 每处理100个项目就让出控制权
    if (i % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0))
    }
  }
}
```

### 防止阻塞

使用 `requestIdleCallback` 在浏览器空闲时执行任务：

```javascript
function doHeavyWork() {
  requestIdleCallback((deadline) => {
    while (deadline.timeRemaining() > 0 && tasks.length > 0) {
      performTask(tasks.pop())
    }

    if (tasks.length > 0) {
      doHeavyWork()
    }
  })
}
```

## 总结

理解事件循环对于编写高效的 JavaScript 代码至关重要。记住：
- 同步代码优先执行
- 微任务优先于宏任务
- 合理使用异步避免阻塞
