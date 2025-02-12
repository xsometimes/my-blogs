import path from "path";
import { writeFileSync, readFileSync, readdirSync, statSync, existsSync } from "fs";
import { v4 as uuidv4 } from 'uuid';


const __dirname = path.resolve(); // node命令参数

const args = process.argv;
console.log("args:", args);
const savePath = __dirname + args[2];
console.log("savePath:", savePath);




const articleListPath = __dirname + "/src/data/articles.ts";
if (!existsSync(articleListPath)) {
  writeFileSync(articleListPath, "");
  console.log("articleListPath not exists, create it");
}


const tagListCode = buildTagsCode();
writeFileSync(articleListPath, tagListCode);
console.log("writeFileSync success")

/**
 * 获取子目录
 * @param {*} directoryPath 
 * @returns 
 * 
 * fs.statSync 函数用于同步获取文件或目录的状态信息
 */
function getSubDirectories(directoryPath) {
  return readdirSync(directoryPath)
  .filter(item => statSync(path.join(directoryPath, item)).isDirectory());
}

/**
 * 生成tag列表
 * @returns 
 */
function buildTagsCode() {
  const articleDirs = getSubDirectories(__dirname + "/public/articles");
  console.log("articleDirs:", articleDirs);
  let str = `export const tagList:ITag[] = [`;
  for (let i = 0; i < articleDirs.length; i++) {
    const item = articleDirs[i];
    str += `${i === 0 ? "" : ","}{
      value: "${item}",
      key: "${uuidv4()}",
    }`;
  }
  str += `];`;
  return str;
}



/**
 * 读取public/docs下的文件夹，
 */