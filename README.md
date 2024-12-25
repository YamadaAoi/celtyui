# vtsc
vue3 + ts + scss components

## vtsc
每次项目经理都说复用 xxx 项目，听得我眉头直皱，我倒是想复用啊，那俩项目 UI 图长得哪里一样了。<br/>
于是我就想写一个 UI 库，于是就有了[@mo-yu/vue](https://github.com/YamadaAoi/mo-yu)，想总结点可复用的组件吧，一看，也就那么多能稍微用用的，其他的你就别想了，这个颜色要改那个位置要换，复用简直扯淡。<br/>
后来大佬介绍了[shadcn/ui](https://github.com/shadcn-ui/ui)，我就想这思路不错，把页面组件大致样式都写好，要用的时候直接把源码加进来，稍微改改，不就行了。<br/>
于是 shadcn 源码一看，需要到后台请求组件文件，惹不起惹不起，没这个资源。
咋整呢，没有服务器只能蹭 npm 了，于是就有了 vtsc。<br/>
归纳遇到的各种 UI，总有一天，我稍微改改，一个页面就搞定，~~就可以开心摸鱼了~~（不是）。<br/>

### 先查看帮助

```bash
$ npx vtsc@latest -h
```

### 添加组件

```bash
$ npx vtsc@latest add [components]
```
