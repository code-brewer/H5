<template>
	<div v-if="show">
		<div class="modal show bs-example-modal-sm">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		                <h4 class="modal-title" >销户确认</h4>
		            </div>
		            <div class="modal-body">
		                <p>确定要为用户{{phone}}进行销户吗?</p>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" @click="this.show=false">取消</button>
		                <button type="button" class="btn btn-primary" @click="cancel">确定</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
	</div>
</template>
<script type="text/javascript">
	import api from  '../api/index.js'
	export default {
		props : {
			show : {
				type  : Boolean,
				default : false,
			},
			phone : String,
		},
		methods : {
			cancel () {
				this.$dispatch('cancel',this.phone)
			}
		}
	}
</script>