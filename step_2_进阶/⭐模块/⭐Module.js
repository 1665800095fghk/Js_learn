// 模块
// 一个文件就是一个模块
// 使用 export import 来交换功能

import { sayHi } from "./test.js";
sayHi("Fghk");

// 模块使用 http(s) 进行工作，如果使用 file:// 打开文件，import export 是不起作用的
// 模块只在第一次导入时被解析
// 在 html 引入模块需要使用 <script type="module" src="test.js">
// 加载脚本可以使用 async <script async type="module" src="test.js">
// 每个模块都有自己的本地顶级作用域，并且可以使用 import export 交换功能
// 模块始终使用 'use strict'