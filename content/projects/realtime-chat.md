---
title: 实时聊天应用
description: 基于 WebSocket 的即时通讯系统，支持频道、文件、推送提醒等协作能力
url: https://socket.io
tech:
  - Vue.js
  - Node.js
  - Socket.io
  - MongoDB
github: https://github.com
previewImage: /projects/previews/realtime-chat.svg
featured: true
---

后端采用 Socket.io 集群 + MongoDB 保存消息记录，前端提供多房间列表与 Typing Indicator，集成服务端推送保障消息送达。还设计了断线自动重连和弱网降级策略。
