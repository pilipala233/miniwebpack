# miniwebpack

miniWebpack 是 webpack 的简化版，旨在理解 webpack 的核心概念，包括资源创建、依赖图构建、加载器、插件和打包过程。

## 功能

- 支持 ES6 模块
- 实现简单的加载器系统
- 实现插件系统以扩展功能
- 生成单一的打包文件

## 安装

### 前提条件

- Node.js (版本 >= 14.x)
- npm 或 yarn

### 安装步骤

1. 克隆仓库：
   ```bash
   git clone https://github.com/pilipala233/miniwebpack.git
   cd miniwebpack
   ```

2. 安装依赖：
   ```bash
   npm install
   # 或者
   yarn install
   ```

## 使用方法

1. 将您的入口文件`main.js`放置在 `example` 目录中。

2. 运行打包器：

    ```bash
    node index.js
    ```

3. 打包文件将生成在 `dist` 目录下，文件名为 `bundle.js`(内置的插件会把它更改为```test.js```)。

## 项目结构

```
mini-webpack/
│
├── src/
│   ├── index.js             # 入口文件
│   ├── jsonLoader.js        # .json 文件的自定义加载器
│   ├── ChangeOutputPath.js  # 更改输出路径的插件
│   └── bundle.js           # 输出打包文件的模板
│
├── example/
│   └── main.js              # 示例入口文件
│
├── dist/
│   └── bundle.js            # 生成的打包文件
│
├── package.json
├── README.md
└── .gitignore
```

## 工作原理

### 创建资源

`createAsset` 函数读取源文件，应用加载器，解析文件为 AST，并收集依赖。

### 依赖图

`createGraph` 函数从入口文件开始生成依赖图。它为每个依赖创建资产，并存储它们之间的关系。

### 加载器

加载器是处理模块源代码的函数。这个 miniwebpack 包含一个 `jsonLoader`，用于处理 `.json` 文件。

### 插件

插件用于扩展打包器的功能。`ChangeOutputPath` 插件用于更改打包文件的输出路径。

### 打包

`build` 函数通过将所有资产及其依赖项的转换代码合并到一个单一文件中，生成最终的打包文件。

## 依赖工具

MiniWebpack 使用以下工具和库：

- **fs**：Node.js 内置的文件系统模块，用于读取和写入文件。
- **path**：Node.js 内置的路径模块，用于处理文件和目录路径。
- **@babel/parser**：Babel 的解析器，用于将源码解析成 AST（抽象语法树）。
- **@babel/traverse**：Babel 的遍历器，用于遍历和操作 AST。
- **babel-core**：Babel 的核心库，用于将 AST 转换为代码。
- **ejs**：嵌入式 JavaScript 模板引擎，用于生成打包文件。
- **tapable**：一个提供钩子机制的库，类似于 webpack 的插件系统。

