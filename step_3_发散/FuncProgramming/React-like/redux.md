## Redux
用以集中管理状态，它的设计原则如下
- 单一来源：应用程序有一个中心状态
- 状态只读：被称为操作的特殊事件描述状态的变化
- 由纯函数修改：操作由 reducers 消费，而 reducers 是纯函数，当用户操作被识别时可以调用，一次发生一个变化  

## 构成
- view 触发操作
- action 调度 reducers
- reducers 与 state 交互
- state 呈现状态给 view

