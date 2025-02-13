import path from "path";
import { writeFileSync, readFileSync, readdirSync, statSync, existsSync } from "fs";
import { v4 as uuidv4 } from 'uuid';


const __dirname = path.resolve(); // node命令参数

const args = process.argv;
console.log("args:", args);


// 创建articles.ts保存在savePath文件夹下
const savePath = __dirname + args[2]; 
// const articleListPath = __dirname + "/src/data/articles.ts";
const articleListPath = `${savePath}articles.ts`;
if (!existsSync(articleListPath)) {
  writeFileSync(articleListPath, "");
  console.log("articleListPath not exists, create it");
}


const tagListCode = buildTagsCode();
const articleListCode = buildArticleListCode();
writeFileSync(articleListPath, `${tagListCode}\n\n${articleListCode}`);
console.log("writeFileSync success")

/**
 * 生成tag列表
 * @returns 
 */
function buildTagsCode() {
  const articleDirs = getAllFolders(__dirname + "/public/articles");
  let str = `// 标签列表\nexport const tagList:ITag[] = [`;
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
function buildArticleListCode() {
  const rootFolder = __dirname + "/public/articles";

  let str = `// 文章列表\nexport const articleList:IArticle[] = [`;
  const fileList = readAllFilesInFolders(rootFolder);
  
  for (let i = 0; i < fileList.length; i++) {
    const item = fileList[i];
    str += `${i === 0? "" : ","}{
      id: "${item.id}",
      title: "${item.title}",
      createTime: ${item.createTime},
      updateTime: ${item.updateTime},
      url: "${item.url}",
      size: ${item.size},
      fileType: "${item.fileType}",
      tags: ${JSON.stringify(item.tags)}
    }`;
  }

  str += `];`;
  return str;

}

/**
 * 读取文件夹下的所有文件
 * @param {*} rootFolder 
 * @returns 
 */
function readAllFilesInFolders(rootFolder) {
  const fileList = [];
  function traverseFolder(folderPath) {
    const files = readdirSync(folderPath);
    
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileStat = statSync(filePath);
      if (fileStat.isDirectory()) {
        traverseFolder(filePath);
      } else if (fileStat.isFile()) {
        const relativePath = path.relative(rootFolder, filePath);
        const extension = path.extname(filePath);  // 获取文件后缀
        const allFolders = filePath.split(path.sep).slice(rootFolder.split(path.sep).length, filePath.split(path.sep).length - 1);
        fileList.push({
          id: uuidv4(),
          title: file,
          createTime: fileStat.birthtimeMs,
          updateTime: fileStat.mtimeMs,
          url: relativePath,
          size: fileStat.size,
          fileType: extension.slice(1),
          tags: allFolders
        });
      }
    })
  }

  traverseFolder(rootFolder);

  return fileList;
}

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


function getAllFolders(rootFolder) {
  const folders = [];

  function traverseFolder(folderPath) {
    const files = readdirSync(folderPath);
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileStat = statSync(filePath);
      if (fileStat.isDirectory()) {
        folders.push(file);
        traverseFolder(filePath);
      }
    });
  }

  traverseFolder(rootFolder);
  return folders;
}
