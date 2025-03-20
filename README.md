# HTML6 新标签的设计
## 1.标签的简要介绍

### 1.<ai-answer>标签

符合于信息时代对于人工智能的需求，该标签的属性共一个，为question属性，在网页中把需要输入的问题放到question属性当中，可以直接在打开网页时获得来自大模型的回答

该标签接入了火山引擎的Deepseek-V3模型的API，所返回的回答全部来自ds

示例：<ai-answer question="介绍一下人工智能">

### 2.<threed-model>标签

与VR虚拟现实技术相符合，可以将下载的3D模型在网页中直接加载出来，同时实现他的自动旋转功能

属性：name->3D模型的路径，统一存放在models文件夹中

axis->建立三维坐标轴，axis决定了模型旋转的围绕轴

speed->旋转的速度，可自行调控
示例：<threed-model

        name="scene.glb"

        axis="y"

        speed="50"

    </threed-model>

### 3.<user-card>标签

输入用户的名字、年龄、性别，为你自动生成一个小型的资料卡

属性：name->名字、age->年龄、gender->性别

示例：<user-card

    name="wwww"

    age="19"

    gender="男">

  </user-card>

### 4.<account-info>标签

输入用户的账号密码（密码会自动被隐藏），生成账号信息卡

属性：account->用户账号、password->用户密码、id->编号

示例：<account-info

    name="张三"

    id="2023001"

    password="abc123"

  ></account-info>

### 5.<divide-line>标签

对HTML5中分割线标签<hr>的升级，颜色更加醒目

属性：state->决定分割线的原点是否闪烁

示例：<divide-line state="flash"></divide-line>

### 6.<chart-compenent>标签

一个静态的生成数据表格的标签，传入数据和对应的名称之后自动成表

属性：name->表格名字、data->每组数据的值、dataid->对应数据的类别

示例：<chart-component

  name="User Analytics"

  data="37210,48530,12670"

  dataid="NewUsers,ActiveUsers,ChurnedUsers">

</chart-component>

### 7.<face-trace>标签
使用了github上的人脸的训练的数据集，打开电脑的摄像头，可以实时识别人脸并跟踪

## 2.开发过程

3.2正式开始项目开发，了解了自定义标签的方法，并初步构想了想要实现什么样子的标签,同时使用AI询问了他认为符合要求的标签

3.3---3.4 阅读AI给出的代码，详细询问了自定义标签的细节处理，在AI的帮助下完成了第一个标签<user-card>的编写，成功实现了目的

3.5---3.7 仿照第一个标签，完成了第二、三、四个标签，包括了:<account-info><divide-line><chart-compenent>，完成了演示网页index编写，将上述的四个标签在index网页下实现演示

3.8---3.9 从网上搜索3D模型并下载到本地，学习了一部分官方的three.js文档，在AI的帮助下注册了自定义标签<threed-model>

3.10-3.12 从火山方舟获取了DeepSeek-V3模型的API，并创建了一个本地的接入点，通过密钥将API接入到了网页的自定义标签功能，让用户可以直接通过标签向ds提问