<template>
    <doc-section id="component/modal" name="模态框(Modal)">
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
    </doc-section>
</template>

<script>
import docSection from '../docSection'
import docTable from '../docTable'
import docCode from '../docCode'
import Modal from '../../../components/bootstrap/Modal'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    Modal
  },
  data () {
    return {
      doc_modal: {
        show: false,
        size: 'md',
        effect: ''
     }
    }
  }
}
</script>
