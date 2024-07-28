# miniwebpack

这个项目是一个简单的模块打包器实现，受到 Webpack 的启发。它接受 ES6 模块，解析并将它们打包成一个单一的 JavaScript 文件。

## 特性

- 解析 ES6 模块
- 收集依赖关系
- 使用 Babel 将 ES6 代码转换为 ES5
- 将模块打包到一个文件中

## 安装

1. 克隆仓库：

    ```bash
    git clone https://github.com/pilipala233/miniwebpack.git
    cd <目录>
    ```

2. 安装依赖：

    ```bash
    npm install
    ```

## 使用方法

1. 将您的入口文件`main.js`放置在 `example` 目录中。

2. 运行打包器：

    ```bash
    node index.js
    ```

3. 打包文件将生成在 `dist` 目录下，文件名为 `bundle.js`。

## 示例

确保您的项目结构如下：

```
your-project/
├── example/
│   ├── main.js
│   └── otherModule.js
├── dist/
│   └── bundle.js (生成的)
├── bundle.js(模版)
├── index.js
└── package.json
```


## 原理

1. **创建资源**：`createAsset` 函数读取文件，使用 Babel 的解析器将其解析为 AST，收集其依赖关系，使用 Babel 转换代码为 ES5，并返回表示模块的对象。

2. **依赖图**：`createGraph` 函数从入口文件开始创建依赖图。它递归处理每个文件，收集所有依赖。

3. **打包**：`build` 函数接收依赖图，使用 EJS 渲染一个模板，包含收集的模块，并将打包后的代码写入文件。

## 依赖

- `fs`：Node.js 文件系统模块
- `path`：Node.js 路径模块
- `@babel/parser`：Babel 解析器，将 JavaScript 代码解析为 AST
- `@babel/traverse`：Babel 遍历器，用于遍历和操作 AST
- `ejs`：嵌入式 JavaScript 模板引擎
- `babel-core`：Babel 核心，用于转换 AST

## 许可证

本项目采用 MIT 许可证 - 详细信息请参阅 [LICENSE](LICENSE) 文件。

