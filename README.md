# HTML6 新标签的设计

## 1. 标签的简要介绍

### 1. `<ai-answer>` 标签

符合信息时代对人工智能的需求，该标签具有一个 `question` 属性。将问题放入 `question` 属性中，可以在打开网页时直接获得来自大模型的回答。

该标签接入了火山引擎的 Deepseek-V3 模型的 API，返回的回答全部来自 DS。

**示例：**

```html
<ai-answer question="介绍一下人工智能"></ai-answer>
```

### 2.<threed-model>标签
与VR虚拟现实技术相符合，可以将下载的3D模型在网页中直接加载出来，同时实现他的自动旋转功能
**属性：**
- ``name``3D模型的路径，统一存放在models文件夹中
- ``axis``模型围绕旋转的轴，默认y轴
- ``speed``模型旋转的速度
**示例：**
```html
<threed-model
        name="scene.glb"
        axis="y"
        speed="50"
    </threed-model>
```

### 3.<user-card>标签
输入用户的名字、年龄、性别，为你自动生成一个小型的资料卡
**属性：**
- ``name``用户的名字
- ``age``用户的年龄
- ``gender``用户的性别

**示例：**
```html
<user-card
    name="wwww"
    age="19"
    gender="男">
  </user-card>
```
### 4.<account-info>标签
输入用户的账号密码（密码会自动被隐藏），生成账号信息卡
**属性：**
- ``account``用户账号
- ``password``用户密码
- ``id``编号
**示例：**
```html
<account-info
    name="张三"
    id="2023001"
    password="abc123"
  ></account-info>
```
### 5.<divide-line>标签
对HTML5中分割线标签<hr>的升级，颜色更加醒目
**属性：**
- ``state``决定分割线的原点是否闪烁

**示例：**
```htnl
<divide-line state="flash"></divide-line>
```
### 6.<chart-compenent>标签
一个静态的生成数据表格的标签，传入数据和对应的名称之后自动成表
**属性：**
- ``name``表格名字
- ``data``每组数据的值
- ``dataid``对应数据的类别

**示例：**
```html
<chart-component
  name="User Analytics"
  dat
  dataid="NewUsers,ActiveUsers,ChurnedUsers">
</chart-component>
```
### 7.<face-trace>标签
使用了github上的人脸的训练的数据集，打开电脑的摄像头，可以实时识别人脸并跟踪，识别区域使用蓝色矩形包围
**注意：**
- 标签仅可本地运行
- 启动app.py之后，点击生成的网页链接，进入识别页面
```bash
python app.py
```
接下来终端中会出现以下内容：
```bash
* Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://10.17.153.76:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 479-563-860
```
按ctrl键的同时点击http://127.0.0.1:5000, 退出时按ctrl+c


## 2.开发过程

3.2正式开始项目开发，了解了自定义标签的方法，并初步构想了想要实现什么样子的标签,同时使用AI询问了他认为符合要求的标签

3.3---3.4 阅读AI给出的代码，详细询问了自定义标签的细节处理，在AI的帮助下完成了第一个标签<user-card>的编写，成功实现了目的

3.5---3.7 仿照第一个标签，完成了第二、三、四个标签，包括了:<account-info><divide-line><chart-compenent>，完成了演示网页index编写，将上述的四个标签在index网页下实现演示

3.8---3.9 从网上搜索3D模型并下载到本地，学习了一部分官方的three.js文档，在AI的帮助下注册了自定义标签<threed-model>

3.10-3.12 从火山方舟获取了DeepSeek-V3模型的API，并创建了一个本地的接入点，通过密钥将API接入到了网页的自定义标签功能，让用户可以直接通过标签向ds提问

## 3.使用指南
1. 所有的标签在使用的时候都只需要在标签中调好属性，中间不需要任何内容
2. 由于某些问题，打开演示网页的时候需要使用open with live server，这需要你安装vs中的插件
3. AI模型的API需要自行更换，接入自己的模型
4. python需要安装的库：
```bash
pip install flask
pip install opencv-python
```
这里我是用的anaconda的虚拟环境，安装命令为：
```bash
conda install flask
conda install opencv-python
```
5.下面给出本次作业使用的网站：
- [sketchfab](https://sketchfab.com/) 3D模型下载
- [Three.js](https://threejs.org/) 加载3D模型使用的库，可做参考
- [火山方舟官网](https://www.volcengine.com/product/ark) 获取大模型的API
- 各种你可以使用到的AI，多方参看

## 4.后续
1.感谢你的观看和使用，期待您的建议和反馈
2.欢迎加入我的开发，你可以通过[QQ邮箱](1833299761@qq.com)或[山大邮箱](202400460052@sdu.edu.cn)联系我
3.后续我将把项目的演示视频做出并上传到平台上，有兴趣请搜索账号名：D-xmdjy