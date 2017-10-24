<template>
	<div class="ams-docs-header">
		<div class="container">
			<h1>基础组件</h1>
			<p>如果项目是一栋摩登高楼大厦的话，下面组件群可算是电源插座或LED电管。</p>
		</div>
	</div>
	<!-- end .ams-docs-header -->
	<div class="container">
		<div class="row">
			<div class="col-md-9">
				<modal-docs></modal-docs>
				<!-- <div class="ams-docs-section">
                    <h1 class="page-header">模态框(Modal)</h1>
                    <div class="ams-example">
                        <button class="btn btn-default" @click="doc_modal.show=true,doc_modal.size=''">打开模态框</button>
                        <button class="btn btn-info" @click="doc_modal.show=true,doc_modal.effect='fade'">fade效果</button>
                        <button class="btn btn-info" @click="doc_modal.show=true,doc_modal.effect='slideDown'">slideDown效果</button>
                        <button class="btn btn-info" @click="doc_modal.show=true,doc_modal.effect='zoom'">zoom效果</button>
                        <button class="btn btn-warning" @click="doc_modal.show=true,doc_modal.size='lg'">lg尺寸</button>
                        <button class="btn btn-warning" @click="doc_modal.show=true,doc_modal.size='sm'">sm尺寸</button>
                        <modal :show.sync="doc_modal.show" :size="doc_modal.size" :effect="doc_modal.effect">
                            <div class="modal-header">
                                <div class="title">提示</div>
                            </div>
                            <div class="modal-body">
                                这是一个模态框
                            </div>
                            <div class="modal-footer">
                                <span class="btn btn-success" @click="doc_modal=false">确定</span>
                            </div>
                        </modal>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>show</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td>false</td>
                                <td>是否显示</td>
                            </tr>
                            <tr>
                                <td><code>size</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td>md</td>
                                <td>尺寸</td>
                            </tr>
                            <tr>
                                <td><code>effect</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td>fade</td>
                                <td>动画效果</td>
                            </tr>
                            <tr>
                                <td><code>backdrop</code></td>
                                <td>
                                    <kbd>Boolean</td>
                                <td>false</td>
                                <td>是否显示遮盖</td>
                            </tr>
                            <tr>
                                <td><code>callback</code></td>
                                <td>
                                    <kbd>Function</kbd>
                                </td>
                                <td>function(){}</td>
                                <td>回调</td>
                            </tr>
                        </tbody>
                    </table>

                    <doc-code language="markup">
                        <modal :show.sync="...">
                            <div slot="modal-header" class="modal-header">
                                <h4 class="modal-title">Modal title</h4>
                            </div>
                            <div slot="modal-body" class="modal-body">...</div>
                        </modal>
                    </doc-code>

                    <p>如果您需要放置自定义的HTML，则可以使用
                        <code>&lt;div slot="modal-title" class="modal-title"&gt;...&lt;/div&gt;</code> 或者
                        <code>&lt;div slot="modal-footer" class="modal-footer"&gt;...&lt;/div&gt;</code>
                    </p>
                </div> -->
				<div class="ams-docs-section">
					<h1 class="page-header"> 工具提示(Tooltip)</h1>
					<div class="ams-example">
						<tooltip placement="top" content="显示在上"><span class="btn btn-info">显示在上</tooltip>
                        <tooltip placement="bottom" content="显示在下"><span class="btn btn-success">显示在下</tooltip>
                        <tooltip placement="left" content="显示在左"><span class="btn btn-warning">显示在左</tooltip>
                        <tooltip placement="right" content="显示在右"><span class="btn btn-danger">显示在右</tooltip>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                
                            <th>名称</th>
                            <th>类型</th>
                            <th>默认值</th>
                            <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>trigger</code></td>
                                <td><kbd>String</kbd></kbd></td>
                                <td>hover</td>
                                <td>触发事件, 分别有<code>click</code> <code>focus</code> <code>hover</code>  <code>contextmenu</code></td>
                            </tr>
           
                            <tr>
                                <td><code>effect</code></td>
                                <td><kbd>String</kbd></td>
                                <td>scale</td>
                                <td>动画效果</td>
                            </tr>
                            <tr>
                                <td><code>content</code></td>
                                <td><kbd>String</td>
                                <td></td>
                                <td>显示内容</td>
                            </tr>
                            <tr>
                                <td><code>placement</code></td>
                                <td><kbd>String</kbd></td>
                                <td>top</td>
                                <td>方向，值为<code>top</code>、<code>bottom、</code><code>left</code>、<code>right</code></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">日期控件(Datepicker)</h1>
                    <p></p>

                    <div class="ams-example">
                        <datepicker value="2017-01-01" format="yyyy-MM-dd"></datepicker>
                   </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                
                            <th>名称</th>
                            <th>类型</th>
                            <th>默认值</th>
                            <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>value</code></td>
                                <td><kbd>String</kbd></td>
                                <td></td>
                                <td>值</td>
                            </tr>
                            <tr>
                                <td><code>width</code></td>
                                <td><kbd>String</kbd></td>
                                <td>200px</td>
                                <td>宽度</td>
                            </tr>
                            <tr>
                                <td><code>format</code></td>
                                <td><kbd>String</kbd></td>
                                <td>MMMM/dd/yyyy</td>
                                <td>日期格式</td>
                            </tr>
                            <tr>
                                <td><code>disabled-days-of-week</code></td>
                                <td><kbd>Array</kbd></td>
                                <td></td>
                                <td>应该禁用的周几</td>
                            </tr>
                            <tr>
                                <td><code>placeholder</code></td>
                                <td><kbd>String</kbd></td>
                                <td></td>
                                <td>占位文字</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">轮播图(Carousel)</h1>
                    <p></p>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>indicators</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td>true</td>
                                <td>是否显示指针点</td>
                            </tr>
                            <tr>
                                <td><code>controls</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td>true</td>
                                <td>是否显示左右控制</td>
                            </tr>
                            <tr>
                                <td><code>interval</code></td>
                                <td>
                                    <kbd>Number</kbd>
                                </td>
                                <td>5000</td>
                                <td>间隔时间</td>
                            </tr>

                        </tbody>
                    </table>

	                    <div class="ams-example">
	                        <carousel>
	                          <slider>
	                            <img src="https://placehold.it/1200x400?text=one">
	                            <div class="carousel-caption">
	                              ...
	                            </div>
	                          </slider>
	                          <slider>
	                            <img src="https://placehold.it/1200x400?text=two">
	                          </slider>
	                          <slider>
	                            <img src="https://placehold.it/1200x400?text=three">
	                          </slider>
	                        </carousel>
	                   </div>
                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">分页(Pager)</h1>
                    
                    <div class="ams-example">
                        <pager :pagesize="10" :total="30" :pagenum="1"></pager>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>pagesize</code></td>
                                <td>
                                    <kbd>Number</kbd>
                                </td>
                                <td>10</td>
                                <td>每页条数</td>
                            </tr>
                            <tr>
                                <td><code>total</code></td>
                                <td>
                                    <kbd>Number</kbd>
                                </td>
                                <td>1</td>
                                <td>总条数</td>
                            </tr>
                            <tr>
                                <td><code>pagenum</code></td>
                                <td>
                                    <kbd>Number</kbd>
                                </td>
                                <td>1</td>
                                <td>页码，可通过监听来改变分页数据。</td>
                            </tr>
                        </tbody>
                    </table>

                    <p></p>
                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">冒泡栏(Snackbar)</h1>

                    <div class="ams-example">
                        <button class="btn btn-primary btn-sm" @click="doc_snackbar = true">点我</button>
                        <snackbar :show.sync="doc_snackbar" message="你是SB?" action-text="知道了"></snackbar>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>show</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td>false</td>
                                <td>是否显示</td>
                            </tr>
                            <tr>
                                <td><code>duration</code></td>
                                <td>
                                    <kbd>Number</kbd>
                                </td>
                                <td>2750</td>
                                <td>持续时间</td>
                            </tr>
                            <tr>
                                <td><code>message</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>文字</td>
                            </tr>
                            <tr>
                                <td><code>actionText</code></td>
                                <td>
                                    <kbd>Number</kbd>
                                </td>
                                <td></td>
                                <td>确定文字</td>
                            </tr>
                            <tr>
                                <td><code>actionHandler</code></td>
                                <td>
                                    <kbd>Function</kbd>
                                </td>
                                <td>function(){}</td>
                                <td>确定回调</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>该组件作为该项目的通用提示栏。</p>
                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">剪切式菜单(MenuClip)</h1>

                    

                    <div class="ams-example">
                        <button-ripple id="ams-menu-button">
                            <i class="glyphicon glyphicon-menu-down"></i>
                        </button-ripple>
                        <menu-clip for="ams-menu-button">
                            <ul>
                                <li class="menu-item"><a href="javascript:;"><button-ripple>项目1</button-ripple></a></li>
                                <li class="menu-item"><a href="javascript:;"><button-ripple>项目2</button-ripple></a></li>
                                <li class="menu-item"><a href="javascript:;"><button-ripple>项目3</button-ripple></a></li>
                            </ul>
                        </menu-clip>                        
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>for</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>依赖对象，触发改组件的目标，通常跟按钮或<code>&lt;button-ripple&gt;</code>结合来使用。</td>
                            </tr>
                        </tbody>
                    </table>

                    <p><code>支持slot</code></p>
                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">涟漪按钮(ButtonRipple)</h1>

                    <div class="ams-example">
                        <button-ripple>default</button-ripple>
                        <button-ripple color="btn-primary">primary</button-ripple>
                        <button-ripple color="btn-success">success</button-ripple>
                        <button-ripple color="btn-info">info</button-ripple>
                        <button-ripple color="btn-danger">danger</button-ripple>
                        <button-ripple color="btn-warning">warning</button-ripple>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>color</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>按钮样式</td>
                            </tr>
                            <tr>
                                <td><code>tag</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td>button</td>
                                <td>标签名</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><code>支持slot</code></p>
                </div>

                <div class="ams-docs-section" id="component/checkbox">
                    <h1 class="page-header">多选框(Checkbox)</h1>
                    <p></p>

                    <div class="ams-example">
                        <checkbox :checked="true" :disabled="" :model.sync="doc_checkbox" value="选我1">选我1</checkbox>
                        <checkbox :model.sync="doc_checkbox" value="选我2">选我2</checkbox>
                        <checkbox :model.sync="doc_checkbox" value="选我3">选我3</checkbox>
                        <checkbox :disabled="true" :model.sync="doc_checkbox" value="选我4">选我4</checkbox>     
                        <div class="highlight" style="margin-top: 20px;">
                            <pre>{{doc_checkbox}}</pre>
                              
                        </div>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>checked</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td></td>
                                <td>是否选中</td>
                            </tr>
                            <tr>
                                <td><code>disabled</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td>false</td>
                                <td>是否失效</td>
                            </tr>
                            <tr>
                                <td><code>model</code></td>
                                <td></td>
                                <td></td>
                                <td>绑定数据</td>
                            </tr>
                            <tr>
                                <td><code>value</code></td>
                                <td></td>
                                <td></td>
                                <td>默认值</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">单选框(Radio)</h1>
                    <p></p>

                    <div class="ams-example">
                        <radio :checked="true" :disabled="" :model.sync="doc_radio" value="选我1" name="doc_radio">选我1</radio>
                        <radio :model.sync="doc_radio" value="选我2" name="doc_radio">选我2</radio>
                        <radio :model.sync="doc_radio" value="选我3" name="doc_radio">选我3</radio>
                        <radio :disabled="true" :model.sync="doc_radio" value="选我4" name="doc_radio">选我4</radio>     

                        <div class="highlight" style="margin-top: 20px;">
                            <pre>{{doc_radio}}</pre>
                        </div>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>checked</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td></td>
                                <td>是否选中</td>
                            </tr>
                            <tr>
                                <td><code>disabled</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td>false</td>
                                <td>是否失效</td>
                            </tr>
                            <tr>
                                <td><code>model</code></td>
                                <td></td>
                                <td></td>
                                <td>绑定数据</td>
                            </tr>
                            <tr>
                                <td><code>value</code></td>
                                <td></td>
                                <td></td>
                                <td>默认值</td>
                            </tr>
                            <tr>
                                <td><code>name</code></td>
                                <td><kbd>String</kbd></td>
                                <td></td>
                                <td>名称</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>


                <div class="ams-docs-section">
                    <h1 class="page-header">滑块(Slider)</h1>
                    <p></p>

                    <div class="ams-example">
                        <slider-input :value.sync="doc_slider" min="0" max="50"></slider-input>
                        <div class="highlight" style="margin-top: 20px;">
                            <pre>{{doc_slider}}</pre>
                        </div>
                    </div>
                    
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>min</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>最小值</td>
                            </tr>
                            <tr>
                                <td><code>max</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>最大值</td>
                            </tr>
                            <tr>
                                <td><code>step</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>级数</td>
                            </tr>
                            <tr>
                                <td><code>value</code></td>
                                <td></td>
                                <td></td>
                                <td>绑定数据</td>
                            </tr>
                            <tr>
                                <td><code>name</code></td>
                                <td><kbd>String</kbd></td>
                                <td></td>
                                <td>名称</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="ams-docs-section">
                    <h1 class="page-header">手风琴(Accordion)</h1>

                    <div class="ams-example">
                        <button-ripple id="doc_accordition_btn" style="display: block; width: 100%;">list</button-ripple>
                        <accordion for="doc_accordition_btn">
                            <button-ripple style="display: block; width: 100%;">item 1</button-ripple>
                            <button-ripple style="display: block; width: 100%;">item 2</button-ripple>
                            <button-ripple style="display: block; width: 100%;">item 3</button-ripple>
                        </accordion>
                        <button-ripple id="doc_accordition_btn2" style="display: block; width: 100%;">list2</button-ripple>
                        <accordion for="doc_accordition_btn2">
                            <button-ripple style="display: block; width: 100%;">item 1</button-ripple>
                            <button-ripple style="display: block; width: 100%;">item 2</button-ripple>
                            <button-ripple style="display: block; width: 100%;">item 3</button-ripple>
                        </accordion>
                   </div>

                   <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>for</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>依赖对象</td>
                            </tr>
                            <tr>
                                <td><code>action</code></td>
                                <td>
                                    <kbd>Function</kbd>
                                </td>
                                <td>function(){}</td>
                                <td>显示后回调</td>
                            </tr>
                        </tbody>
                    </table>

                    <p><code>支持slot</code></p>
                </div>
   				 
				 <div class="ams-docs-section">
                    <h1 class="page-header">加载提示(loading)</h1>

                    <div class="ams-example">
                    	<button-ripple color="btn-primary" @click="loadconfig.show=!loadconfig.show">点我</button-ripple>
                        <loading :show-msg.sync="loadconfig.show" :msg="loadconfig.msg"></loading>
                   </div>

                   <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>showMsg</code></td>
                                <td>
                                    <kbd>Boolean</kbd>
                                </td>
                                <td>false</td>
                                <td>显示开关</td>
                            </tr>
                            <tr>
                                <td><code>msg</code></td>
                                <td>
                                    <kbd>String</kbd>
                                </td>
                                <td></td>
                                <td>显示内容</td>
                            </tr>
                        </tbody>
                   </table>
               </div>
                 
                 <div class="ams-docs-section">
                    <h1 class="page-header">疑问注释(question)</h1>
						 
                    <div class="ams-example">
                    	<question>
                    		没错就是这个样子
                    	</question> 
                   </div>
 					 <p><code>slot写法</code></p>
                </div>
                 <div class="ams-docs-section">
                    <h1 class="page-header">页签(tabs)</h1>
						 
                    <div class="ams-example">
                    	 <tabs :header="pageConfig.header" :content="pageConfig.content" :width="100"  >
                    			<div slot="basic">
                    				基本配置
                    			</div>
                    			<div slot="share">
                    				分享页面
                    			</div>
                    			<div slot="more">
                    				更多页面
                    			</div>
                    	 </tabs>
                   </div>
 					 <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类型</th>
                                <th>默认值</th>
                                <th>描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>header</code></td>
                                <td>
                                    <kbd>Array</kbd>
                                </td>
                                <td></td>
                                <td>tabs标签页的标题</td>
                            </tr>
                            <tr>
                                <td><code>content</code></td>
                                <td>
                                    <kbd>Array</kbd>
                                </td>
                                <td></td>
                                <td>内容页面的slot的名称</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-3">
                <nav class="ams-docs-sidebar">
                    <ul class="nav ams-docs-sidenav">
                        <li><a href="#">模态框</a></li>
                        <li><a href="#">工具提示</a></li>
                        <li><a href="#">日期控件</a></li>
                        <li><a href="#">轮播图</a></li>
                        <li><a href="#">分页</a></li>
                        <li><a href="#">冒泡栏</a></li>
                        <li><a href="#">剪切式菜单</a></li>
                        <li><a href="#">涟漪按钮</a></li>
                        <li><a href="#">手风琴</a></li>
                        <li><a href="#">加载提示</a></li>
                        <li><a href="#">疑问注释</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>


</template>

<script>
    import docSection from './docSection'
    import docTable from './docTable'
    import docCode from './docCode'
    import Modal from '../../components/bootstrap/Modal'
    import Tooltip from '../../components/bootstrap/Tooltip'
    import Datepicker from '../../components/bootstrap/Datepicker'
    import Carousel from '../../components/bootstrap/Carousel'
    import Slider from '../../components/bootstrap/Slider'
    import Pager from '../../components/web-base/Pager'
    import snackbar from '../../components/web-base/snackbar'
    import menuClip from '../../components/web-base/menu-clip'
    import buttonRipple from '../../components/web-base/button-ripple'
    import checkbox from '../../components/web-base/checkbox'
    import radio from '../../components/web-base/radio'
    import sliderInput from '../../components/web-base/slider'
    import accordion from '../../components/web-base/accordion'
	import loading from '../../components/web-base/loading'
    import modalDocs from './example/modalDocs'
    import question from '../../components/web-base/question'
    import tabs from '../../components/web-base/tabs'
    export default {
        components: {
            docSection,
            docTable,
            docCode,
			loading,
            Modal,
            Tooltip,
            Carousel,
            Slider,
            Pager,
            snackbar,
            menuClip,
            buttonRipple,
            checkbox,
            radio,
            sliderInput,
            accordion,
            Datepicker,
			question,
            modalDocs,
            tabs
        },
        data() {
            return {
            	pageConfig: {
					header: ["基础信息", "分享配置", "更多功能"],
					content: ["basic", "share", "more"]
				},
                doc_modal: {
                    show: false,
                    size: 'md',
                    effect: ''
                },
                loadconfig:{
                	show:false,
                	msg:'数据加载中'
                },
                doc_snackbar: false,
                doc_checkbox: [],
                doc_radio: '',
                doc_slider: 0,
            }
        }
    }
</script>

<style lang="scss">
    .ams-docs-section .carousel {
        .carousel-inner {
            ul {
                padding: 0;
                li {
                    list-style-type: none;
                    float: left;
                }
            }
        }
    }
</style>