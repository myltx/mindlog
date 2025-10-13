---
title: TypeScript 高级类型技巧
description: 探索 TypeScript 中的高级类型系统，包括条件类型、映射类型、模板字面量类型等强大特性
date: 2024-01-10
category: 编程语言
tags: [TypeScript, 类型系统, 进阶技巧]
author: Geek Developer
readingTime: 10
---

# TypeScript 高级类型技巧

TypeScript 的类型系统非常强大，掌握高级类型技巧可以让你的代码更加类型安全和优雅。

## 条件类型（Conditional Types）

条件类型允许我们根据条件选择类型：

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
```

### 实用示例：提取函数返回类型

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function getUserInfo() {
  return { name: 'John', age: 30 }
}

type UserInfo = ReturnType<typeof getUserInfo>
// { name: string; age: number }
```

## 映射类型（Mapped Types）

映射类型可以基于已有类型创建新类型：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

interface User {
  name: string
  age: number
}

type ReadonlyUser = Readonly<User>
// { readonly name: string; readonly age: number }
```

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型，允许我们操作字符串类型：

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'> // 'onClick'
type MouseEvent = EventName<'mouseMove'> // 'onMouseMove'
```

## 工具类型组合

结合多个工具类型可以创建强大的类型转换：

```typescript
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface User {
  id: number
  name: string
  email: string
}

type UpdateUser = PartialBy<User, 'name' | 'email'>
// { id: number; name?: string; email?: string }
```

## 最佳实践

1. **避免使用 any** - 使用 unknown 代替
2. **善用类型守卫** - 确保类型安全
3. **利用工具类型** - 避免重复定义
4. **保持类型简洁** - 不要过度复杂化

## 总结

掌握这些高级类型技巧可以让你的 TypeScript 代码更加健壮和易于维护。记住，类型系统是你的朋友，而不是负担。
