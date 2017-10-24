<template>
	<ul class="pagination">
	    <li :class="{disabled: pagenum<=1}">
	      <a href="javascript:;" aria-label="Previous" @click="prev">
	        <span aria-hidden="true"><i class="glyphicon glyphicon-triangle-left"></i></span>
	      </a>
	    </li>
	    <li v-for="page in pagetotalArr" :class="{active: pagenum==page}"><a href="javascript:;" @click="pagenum=page">{{page}}</a></li>
	    <li :class="{disabled: pagenum>=pagetotal}">
	      <a href="javascript:;" aria-label="Next" @click="next">
	        <span aria-hidden="true"><i class="glyphicon glyphicon-triangle-right"></i></span>
	      </a>
	    </li>
	  </ul>
</template>

<script>
	export default {
		props: {
			pagesize: {
				type: Number,
				default: 10
			},
			total: {
				type: Number,
				default: 1
			},
			pagenum: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				pagetotal: 1,
				pagetotalArr: ['1']
			}
		},
		watch: {
			total(val) {
				console.log(val)
				if(val) {
					this.pagetotal = Math.ceil(this.total / this.pagesize);
					this.pagetotalArr = this.mkPageArr(this.pagetotal);
				}
			}
		},
		methods: {
			mkPageArr(pagetotal) {
				var arr = [];
				for (var i = 0; i < pagetotal; i++) {
					arr.push(i+1);
				}

				return arr;
			},

			prev() {
				if(this.pagenum<=1) return;

				this.pagenum--;
			},

			next() {
				if(this.pagenum>=this.pagetotal) return;

				this.pagenum++;
			}
		}
	}
</script>