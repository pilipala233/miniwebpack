import fs from "fs";
import path from "path";
import parser from "@babel/parser"
import traverse from "@babel/traverse"
import ejs from "ejs";
import { transformFromAst } from "babel-core";
let id=0
function createAsset(filePath) {

    let source = fs.readFileSync(filePath, {
      encoding: "utf-8",
    });

    const ast = parser.parse(source, {
        sourceType:"module"
      
    });
    const deps = [];
    traverse.default(ast,{
        ImportDeclaration({node}){
            deps.push(node.source.value);
        }
    })
    const { code } = transformFromAst(ast, null, {
        presets: ["env"],
      });

    return {
        filePath,
        code,
        deps,
        mapping:{},
        id:id++
    }
  }


function createGraph() {
const mainAsset = createAsset("./example/main.js");
console.log(mainAsset)
const queue = [mainAsset];

for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
    const child = createAsset(path.resolve("./example", relativePath));
    asset.mapping[relativePath] = child.id
    //asset.mapping[relativePath] = child.id;
    queue.push(child);
    });
}

return queue;
}

function build(graph) {
    const template = fs.readFileSync("./bundle.js", { encoding: "utf-8" });
    const data = graph.map((asset) => {
      const { id, code, mapping} = asset;
      return {
        id,
        code,
       
        mapping,
      };
    });
    console.log(data)
    const code = ejs.render(template,{data});
  
    let outputPath = "./dist/bundle.js";

    fs.writeFileSync(outputPath, code);
  }
build(createGraph())