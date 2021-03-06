# 瀑布流demo

### 3.23  
  
想要学习axios去网络请求图片的url，但是一直没能解决跨域的问题，有点点头疼。
我准备先去解决别的问题。   

### 3.24    

点击按钮发送ajax请求。

### 3.25

实现窗口大小变化Container组件重新渲染，但是Container组件之前的数据（Ajax请求的次数）怎么保存？？

> 解决方法：在父组件中初始化count，Container子组件每请求一次就跟父组件通信要求count++。窗口大小改变，子组件销毁再重新挂载，挂载时父组件通知子组件count的值，子组件立马请求count次ajax请求。

为什么窗口大小变化一次子组件的key不只变化一次？（这样会导致窗口变化一次子组件多次挂载并发送多次pubsub命令，导致实际重新渲染时ajax请求次数远高于预期）

> 解决方法：... **3.29推翻重做！**

### 3.28

如果网络不那么顺畅，用户在等待Ajax请求结果的时候页面上一点变化都没有，用户体验将会很差，所以我设计了 骨架屏 和 loading效果。

骨架屏在用户第一次访问的时候会出现，图片请求成功之后就消失。每一次请求都会触发loading效果，同样是请求成功之后就消失。

有一个疑问：很容易出现 "cannot use count before innitializing" 的报错，应该是变量在使用之前没有初始化，将该变量在setup最前头初始化就解决了问题。vue打包没有帮我解决这个问题嘛？

### 3.29

* 文字超出盒子显示省略号：
overflow:hidden; text-overeflow:hidden; white-space:nowrap;
* 超链接点击新开页面：
target="_blank"
* 找到一个提供图片的api借口，通过axios请求回图片url，呈现图片到页面上。
* 监测页面滚动到底部，自动加载图片。
* 瀑布流怎么保证三列图片长度差不多？ 
目前是通过 每次请求时往三列槽中各自添加六张图片，请求次数多了之后三列槽的长度有较大差别。  ...(待解决)
* 当窗⼝触发resize的时候，要求瀑布流的重新渲染，这⾥可以加些动画优化效果：
**v-if**实现重新渲染，**Animate.css**实现动画效果。