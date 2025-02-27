# celtyui

celtyui是一个headless UI 库，名字出自《无头骑士异闻录》角色“塞尔提·史特路尔森(Celty Sturluson)”。
用于归纳项目中的可复用部分，目前支持 vue3 和 react 两个版本的组件。

## celtyui

每次都说复用 xxx 项目，听得我眉头直皱，我倒是想复用啊，那俩项目 UI 图长得哪里一样了。<br/>
于是我就想写一个 UI 库，于是就有了[@mo-yu/vue](https://github.com/YamadaAoi/mo-yu)，想总结点可复用的组件吧，一看，也就那么多能稍微用用的，其他的你就别想了，这个颜色要改那个位置要换，复用简直扯淡。<br/>
后来大佬介绍了[shadcn/ui](https://github.com/shadcn-ui/ui)，我就想这思路不错，把页面组件大致样式都写好，要用的时候直接把源码加进来，稍微改改，不就行了。<br/>
打开 shadcn 源码一看，需要到后台请求组件文件，惹不起惹不起，没这个资源。
咋整呢，没有服务器只能蹭 npm 了，于是就有了 celtyui。<br/>
归纳遇到的各种 UI，总有一天，我稍微改改，一个页面就搞定，~~就可以开心摸鱼了~~（不是）。<br/>

### 注意

- vue组件统一以 index.vue 命名，实际组件名为组件所在包名，需要关闭项目中的eslint校验（'vue/multi-word-component-names': 'off'）。
- react组件统一以 index.tsx 命名，实际组件名为组件所在包名
- 组件内只提供基础样式，如无必要，不会引入（背景）图片

### 先查看帮助

```bash
$ npx celtyui@latest -h

Usage: celtyui [options] [command]

添加组件源码（vue3 or react）到您的项目中

Options:
  -v, --version                  显式版本号
  -h, --help                     display help for command

Commands:
  init [options]                 初始化配置文件 [celtyui.json] 到您项目的根目录中
  add [options] [components...]  添加组件源码（vue3 or react）到您的项目中
  demo [options]                 启动本地服务器打开 [celtyui] 内置 demo 页面
  help [command]                 display help for command
```

### 初始化配置（可选）

```bash
$ npx celtyui@latest init -h

Usage: celtyui init [options]

初始化配置文件 [celtyui.json] 到您项目的根目录中

Options:
  -c, --cwd <cwd>    工作目录，默认当前位置 (default: "xxxxxx\\celtyui")
  -p, --path <path>  组件存放路径，默认 src/components (default: "src/components")
  -t, --port <port>  demo页面监听端口 (default: "3210")
  -l, --lang <lang>  框架类型（vue or react） (default: "vue")
  -h, --help         display help for command
```

可以配置一些参数，目前有：

```json
{
  "path": "src/components", // 组件存放路径
  "port": "3000", // 本地demo服务启动端口
  "lang": "vue" // 组件语言，目前支持 vue 和 react
}
```

### 添加组件

```bash
$ npx celtyui@latest add -h

Usage: celtyui add [options] [components...]

添加组件源码（vue3 or react）到您的项目中

Arguments:
  components         需要添加的组件

Options:
  -c, --cwd <cwd>    工作目录，默认当前位置 (default: "xxxxxx\\celtyui")
  -o, --overwrite    覆盖已有的同名组件文件 (default: false)
  -a, --all          添加库内所有组件到您的项目中 (default: false)
  -p, --path <path>  组件存放路径，默认 src/components
  -l, --lang <lang>  框架类型（vue or react），默认vue
  -h, --help         display help for command
```

### 查看demo

```bash
$ npx celtyui@latest demo -h

Usage: celtyui demo [options]

启动本地服务器打开 [celtyui] 内置 demo 页面

Options:
  -c, --cwd <cwd>    工作目录，默认当前位置 (default: "D:\\codes\\github\\celtyui")
  -p, --port <port>  demo页面监听端口，默认3210
  -l, --lang <lang>  框架类型（vue or react），默认vue
  -h, --help         display help for command
```
