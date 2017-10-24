<template>
	<div class="ams-docs-header">
		<div class="container">
			<h1>关于</h1>
			<p>注意事项。</p>
		</div>
	</div>
	<!-- end .ams-docs-header -->
	<div class="container">
		<div class="row">
			<div class="col-md-9">
				<doc-section name="活动配置数据的存储"  >
					<p>活动配置数据分为两大块,一部分为活动基础信息，一部分为活动扩展信息，分别存于<code class="bash">global.js</code>文件中。然后扩展于<code class="bash">window.store</code>对象中的</p>
					<h2>使用注意点：</h2>
					<p>1：在配置文件中即<code class="bash">config.vue</code>里面定义后，子组件建议用props去获取信息不要重复的去定义window.store</p>
					<p>2：分别有两个js对应两个store中的两个活动信息对象，分别在各自模板中的<code class="bash">extbody.js</code><code class="bash">extbodyconfig.js</code>里</p>
				</doc-section>
					<doc-section name="活动配置模块使用提示"  >
					<p>注释：*由于我们是每个模板都是单独编译然后附加,然后会产生一系列模块组件在配置界面<code class="bash">config.vue</code>和活动的自定义条件配置<code class="bash">condition.vue</code>中都引用了，即会产生bug。</p>
					<h2>使用注意点：</h2>
					<p>1：如果遇到两遍都需要引用的组件，请从新复制一份组件，不要引用同一个组件即可，例如:抢座位(图.1)</p>
 					<img :src="'src/assets/doc_pic_8.jpg'" class="doc-img" width="100%"><small style="text-align: center;width: 100%;display: block;">(图1)</small>
					<p>重建新组件如下即(图.2)</p>
					<img :src="'src/assets/doc_pic_9.jpg'" class="doc-img" width="100%"><small style="text-align: center;width: 100%;display: block;">(图2)</small>
					<p>引用实例如下即(图.3)</p>
					<img :src="'src/assets/doc_pic_10.jpg'" class="doc-img" width="100%"><small style="text-align: center;width: 100%;display: block;">(图3)</small>
					</doc-section>
			</div>
		</div>
	</div>
</template>

<script>
	import docSection from './docSection'
	import docTable from './docTable'
	import docCode from './docCode'
	export default {
		components: {
			docSection,
			docTable,
			docCode,
		},
		data() {
			return {

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