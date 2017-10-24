<template>
    <div class="ams-docs-header">
        <div class="container">
            <h1>前端开发规范</h1>
            <p>开发者需要遵循关于前端开发的规范操作</p>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <!-- HTML规范 -->
                <div class="ams-docs-section">
                    <h1 class="page-header">HTML规范</h1>
                    <!-- 通用 -->
                    <h2>通用</h2>
                    <p>1、文件以<code>&lt;!DOCTYPE html&gt;</code>首行顶格开始；</p>
                    <p>2、必须申明文档的编码charset，且与文件本身编码保持一致，推荐使用UTF-8编码格式：</p>
                    <div class="highlight">
                        <pre>
                            <code>&lt;meta charset="utf-8" /&gt;</code>
                        </pre>
                    </div>
                    <p>3、根据页面内容和需求填写适当的<code>keywords</code>和<code>description</code>；</p>
                    <p>4、引入css时必须指明<code>rel="stylesheet"</code>；</p>
                    <p>5、在head标签中引入页面需要的所有css资源，尽量在页面末尾引入javascript文件。</p>
                    <!-- /通用 -->
                    <!-- 保持良好的简洁的树形结构 -->
                    <h2>保持良好的简洁的树形结构</h2>
                    <p>1、每一个块级元素都需另起一行，每一行都使用四个空格缩进对齐，父子级保持缩进结构；</p>
                    <p>Tab缩进可以转换为空格，sublime设置如下：</p>
                    <img :src="'src/assets/criterion-img1.png'" class="doc-img">
                    <p>2、编写代码时编辑器可以设置为自动换行，便于阅读和编写。</p>
                    <p>Mac设置：</p>
                    <img src="'src/assets/criterion-img2.png'" class="doc-img">
                    <!-- /保持良好的简洁的树形结构 -->
                    <!-- 命名 -->
                    <h2>命名</h2>
                    <p>1、类名（class）必须单词全字母小写，单词间以 - 分隔；</p>
                    <p>2、类名（class）定义尽可能代表相应模块的内容或功能，少量、单一允许以样式属性进行命名；</p>
                    <p>以模块功能进行命名：</p>
                    <div class="highlight">
                        <pre>
                            <code>&lt;div class="sidebar"&gt;&lt;div&gt;</code>
                        </pre>
                    </div>
                    <p>以样式属性进行命名：</p>
                    <div class="highlight">
                        <pre>
                            <code>&lt;div class="left"&gt;&lt;div&gt;</code>
                        </pre>
                    </div>
                    <p>3、id必须保证页面唯一性；</p>
                    <p>4、id、类名（class）命名时，在避免冲突并描述清楚的前提下尽可能短；</p>
                    <div class="hightlight">
                        <pre>                            
<code>&lt;-- good -- &gt;
&lt;div id="nav"&gt;&lt;/div&gt;

&lt;-- bad -- &gt;
&lt;div id="navigation"&gt;&lt;/div&gt;


&lt;-- good -- &gt;
&lt;div id="comment"&gt;&lt;/div&gt;

&lt;-- bad -- &gt;
&lt;div id="com"&gt;&lt;/div&gt;</code>
                        </pre>
                    </div>
                    <p>5、同一个页面，应该避免使用相同的name与id；*IE浏览器会混淆元素的id和name属性，<code>document.getElementById</code>可能获得不期望的元素。*</p>
                    <div class="highlight">
                        <pre>
<code>&lt;input name="foo"&gt;
&lt;div id="foo"&gt;&lt;/div&gt;
&lt;script&gt;
//IE6 将显示 INPUT
alert(document.getElementById('foo').tagName);
&lt;/script&gt;</code>
                        </pre>
                    </div>
                    <!-- /命名 -->
                    <!-- 标签用法 -->
                    <h2>标签用法</h2>
                    <p>1、标签名必须使用小写字母。</p>
                    <p>2、对于无需自闭合的标签，不允许自闭合。</p>
                    <p>3、HTML标签的使用应该遵循标签的含义。</p>
                    <p>4、在css可以实现相同需求的情况下尽量不使用表格进行布局。</p>
                    <p>5、标签的使用尽量简洁，减少不必要的标签和层次结构。</p>
                    <h2>属性用法</h2>
                    <p>1、属性名必须使用小写字母；</p>
                    <p>2、属性必须用双引号包含；</p>
                    <p>3、布尔类型的属性，建议不添加属性值</p>
                    <div class="highlight">
                        <pre>
                            <code>&lt;input type="text" disabled /&gt;</code>
                        </pre>
                    </div>
                    <!-- /标签用法 -->
                    <!-- 图片 -->
                    <h2>图片</h2>
                    <p>1、<code>禁止</code>img的<code>src</code>取值为空，延迟加载的图片也要添加默认的<code>src</code>；*<code>src</code>值为空会导致部分浏览器重新加载一次当前页面*；</p>
                    <p>2、为重要的图片添加<code>alt</code>属性。</p>
                    <h2>说明文案的注释写法</h2>
                    <p>采用类似标签闭合的写法，与HTML统一格式；注释文案两头空格，与CSS注释统一格式。</p>
                    <div class="highlight">
                        <pre>
<code>&lt;!-- 头部 --&gt;
&lt;div class="g-hd"&gt;
    &lt;!-- LOGo --&gt;
    &lt;h1 class="m-logo"&gt;&lt;a href="javascript:;"&gt;LOGO&lt;/a&gt;&lt;/h1&gt;
    &lt;!-- /LOGO --&gt;
    &lt;!-- 导航 --&gt;
    &lt;ul class="m-nav"&gt;
        &lt;li&gt;&lt;a href="javascript:;"&gt;NAV1&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="javascript:;"&gt;NAV2&lt;/a&gt;&lt;/li&gt;
        &lt;!-- 更多导航项 --&gt;
    &lt;/ul&gt;
    &lt;!-- /导航 --&gt;
&lt;/div&gt;
&lt;!-- /头部 --&gt;</code>
                        </pre>
                    </div>
                    <p>sublime关于注释的插件：docblockr</p>
                    <p>简单用法</p>
                    <p>1、/* + tab键：单行注释</p>
                    <p>2、/** + tab键：函数注释</p>
                    <!-- /图片 -->
                    <!-- 框架（vue、angular）关于编写html代码的注意事项 -->
                    <h2>框架（vue、angular）关于编写html代码的注意事项</h2>
                    <!-- /框架（vue、angular）关于编写html代码的注意事项 -->
                </div>
                <!-- /HTML规范 -->
                <!-- CSS规范 -->
                <div class="ams-docs-section">
                    <h1>CSS规范</h1>
                    <h2>编码风格</h2>
                    <p>1、文件使用无BOM的UTF-8编码格式；</p>
                    <p>2、每个声明块的左花括号前添加一个空格、花括号内前后各一个空格、每条声明语句的冒号后添加一个空格，所有声明语句都应当以分号结尾；</p>
                    <div class="highlight">
                        <pre>
                            <code>.header { width: 200px; }</code>
                        </pre>
                    </div>
                    <p>3、对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格；</p>
                    <div class="highlight">
                        <pre>
                            <code>background-color: rgba(0, 0, 0, .5);</code>
                        </pre>
                    </div>
                    <p>4、十六进制值应该全部小写，尽量使用简写形式；</p>
                    <div class="highlight">
                        <pre>
                            <code>color: #f80;</code>
                        </pre>
                    </div>
                    <p>5、避免为0值指定单位，例如，用<code>margin: 0;</code>代替<code>margin: 0px;</code>省略小于1的小数前面的0，例如<code>.5</code>代替<code>0.5</code>。</p>

                    <!-- 简写形式的属性声明 -->
                    <h2>简写形式的属性声明</h2>
                    <p>1、在可以使用缩写的情况下，尽量使用属性缩写；</p>
                    <div class="highlight">
                        <pre>
                            <code>.post { font: 12px/1.5 arial, sans-serif; }</code>
                        </pre>
                    </div>
                    <p>2、使用border、margin、padding等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。</p>
                    <p>因为border、margin、padding等缩写会同时设置多个属性的值，容易覆盖不需要覆盖的设定。如某些方向需要继承其他声明的值，则应该分开设置；</p>
                    <div class="highlight">
                        <pre>
                            <code>.page { margin: 5px 8px 10px 12px; }</code>
                        </pre>
                    </div>
                    <!-- /简写形式的属性声明 -->
                    <!-- 属性书写顺序 -->
                    <h2>属性书写顺序</h2>
                    <p>同一规则下的属性在书写时，应该按照功能进行分组，并以<code>Formatting Model</code>（布局方式、位置）、<code>Box Model</code>（尺寸）、<code>Typographic</code>（文本相关）、<code>Visual</code>（视觉效果）的顺序书写，以提高代码的可读性。</p>
                    <p><code>Formatting Model</code>相关属性包括：position、top、right、bottom、left、float、display、overflow等；<br/>
                    <code>Box Model</code>相关属性包括：border、margin、padding、width、height等；<br/>
                    <code>Typographic</code>相关属性包括：font、line-height、text-align、word-wrap等；<br/>
                    <code>Visual</code>相关属性包括：background、color、transition、list-style等。</p>
                    <!-- /属性书写顺序 -->
                    <!-- 清除浮动用法 -->
                    <h2>清除浮动用法</h2>
                    <p>当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置clear或者触发BFC的方式进行清除浮动。尽量不使用增加空标签的方式。</p>
                    <p>方式1：设置clearfix</p>
                    <div class="highlight">
                        <pre>
<code>/* 针对IE6和IE7的兼容 */
.clearfix { *zoom: 1; }
.clearfix:after {
    content: "";
    display: table;
    clear: both;
}</code>
                        </pre>
                    </div>
                    <p>方式2：触发BFC达到清除浮动效果。常见触发BFC的方式有：</p>
                    <p>
                        <code>float</code>属性不为none；<br/>
                        <code>position</code>不为static；<br/>
                        <code>display</code>为inline-block、table-cell、table-caption、flex、inline-flex；<br/>
                        <code>overflow</code>不为visible；
                    </p>
                    <!-- /清除浮动用法 -->
                </div>
                <!-- /CSS规范 -->
                <!-- javascript规范 -->
                <div class="ams-docs-section">
                    <h1>javascript规范</h1>
                    <!-- 编写风格 -->
                    <h2>编写风格</h2>
                    <p>1、保持缩进对齐；</p>
                    <p>2、使用一个<code>var</code>以及新行声明多个变量，缩进4个空格；</p>
                    <div class="highlight">
                        <pre>
                            <code>var length, arr, code;</code>
                        </pre>
                    </div>
                    <p>3、等号前后保持一个空格距离；</p>
                    <div class="highlight">
                        <pre>
                            <code>length = arr.length;</code>
                        </pre>
                    </div>
                    <p>4、编写if语句、for语句时，弧括号前后保持一个空格距离，左花括号紧跟其后并保持一个空格距离；</p>
                    <div class="highlight">
                        <pre>
<code>for (let i = 0; i &lt; 10; i++) {
    /* code*/
}</code>
                        </pre>
                    </div>
                    <p>5、不要加多余的逗号，这可能会在IE下引起错误，同时如果多一个逗号某些ES3的实现会计算多数组的长度。</p>
                    <div class="highlight">
                        <pre>
<code>/* bad */
var hero = {
    firstName: 'Kevin',
    lastName: 'Flynn',
}

/* good */
var hero = {
    firstName: 'Kevin',
    lastName: 'Flynn'
}
</code>
                        </pre>
                    </div>
                    <!-- /编写风格 -->
                    <!-- 命名规则 -->
                    <h2>命名规则</h2>
                    <p>1、变量声明尽可能可以描述该变量的功能；</p>
                    <p>2、一般变量以驼峰形式进行定义；</p>
                    <div class="highlight">
                        <pre>
                            <code>var backgroundColor;</code>
                        </pre>
                    </div>
                    <p>3、如果变量是指向HTMl元素的，则变量名前添加<code>$</code>符号代表引用元素</p>
                    <div class="highlight">
                        <pre>
                            <code>var $query;</code>
                        </pre>
                    </div>
                    <p>4、常量全部用大写字母；</p>
                    <div class="highlight">
                        <pre>
                            <code>var PI = 3.1415926;</code>
                        </pre>
                    </div>
                    <p>5、构造器函数首字母大写；</p>
                    <div class="highlight">
                        <pre>
                            <code>function Person() { ... }</code>
                        </pre>
                    </div>
                    <p>6、私用函数用下划线开头；</p>
                    <div class="highlight">
                        <pre>
<code>var person = {
    _setSext: function () {
        /* code */
    },
    _setName: function() {
        /* code */
    }
}</code>
                        </pre>
                    </div>
                    <p>7、定义调取获取信息接口要添加<code>get</code>表示获取动作，函数关于设置功能要添加<code>set</code>表示设置动作；</p>
                    <div class="highlight">
                        <pre>
<code>// 获取动作
function getPersonalInfo() { ... }

// 设置动作
function setArray() { ... }</code>
                        </pre>
                    </div>
                    <p>8、对字符串使用单引号''（因为拼接html字符串会出现双引号""）。</p>
                    <!-- /命名规则 -->
                    <!-- 条件表达式和等号的使用 -->
                    <h2>条件表达式和等号的使用</h2>
                    <p>1、合理使用<code>===</code>和<code>!==</code>以及<code>==</code>和<code>!=</code>；</p>
                    <p>2、条件表达式的强制类型转换遵循以下规则：</p>
                    <p>
                        * 对象被计算为true；<br/>
                        * <code>undefined</code>被计算为false；<br/>
                        * <code>Null</code>被计算为false；<br/>
                        * 布尔值被计算为布尔的值；<br/>
                        * 数字如果是 <code>+0</code>,<code>-0</code>, or <code>NaN</code>被计算为false , 否则为true；<br/>
                        * 字符串如果是空字符串<code>' '</code>则被计算为false, 否则为true
                    </p>
                    <!-- /条件表达式和等号的使用 -->
                    <!-- 代码性能 -->
                    <h2>代码性能</h2>
                    <p>1、用<code>===</code>代替<code>==</code></p>
                    <!-- /代码性能 -->
                    <!-- 注释 -->
                    <h2>注释</h2>
                    <p>1、使用/** ... */进行多行注释，包括描述，指定类型以及参数值和返回值；</p>
                    <div class="highlight">
                        <pre>
<code>/**
 * [function description]
 *
 * @param &lt;String&gt; id
 * return &lt;Element element&gt;
 */
function getElement(id) {
    /* code */
    return element;
}</code>
                        </pre>
                    </div>
                    <p>1、使用//进行单行注释，在代码的上面进行单行注释，注释前保持一个空格；</p>
                    <div class="highlight">
                        <pre>
<code>// tab选项活动状态
var active = true;</code>
                        </pre>
                    </div>
                    <!-- /注释 -->
                </div>
                <!-- /javascript规范 -->
            </div>
            <div class="col-md-3">
                <nav class="ams-docs-sidebar">
                    <ul class="nav ams-docs-sidenav">
                        <li><a href="#">HTML规范</a>
                            <ul class="nav">
                                <li><a href="#">通用</a></li>
                                <li><a href="#">命名</a></li>
                                <li><a href="#">标签用法</a></li>
                                <li><a href="#">属性用法</a></li>
                                <li><a href="#">图片</a></li>
                                <li><a href="#">说明文案的注释写法</a></li>
                                <li><a href="#">框架（vue、angular）关于编写html代码的注意事项</a></li>
                            </ul>
                        </li>
                        <li><a href="#">CSS规范</a>
                            <ul class="nav">
                                <li><a href="#">编码风格</a></li>
                                <li><a href="#">简写形式的属性声明</a></li>
                                <li><a href="#">属性书写顺序</a></li>
                                <li><a href="#">清除浮动用法</a></li>
                            </ul>
                        </li>
                        <li><a href="#">javascript规范</a>
                            <ul class="nav">
                                <li><a href="#">编码风格</a></li>
                                <li><a href="#">命名规则</a></li>
                                <li><a href="#">条件表达式和等号的使用</a></li>
                                <li><a href="#">代码性能</a></li>
                                <li><a href="#">注释</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>