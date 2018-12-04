<template>
 <div>
     <div class="md-modal modal-msg md-modal-transition md-show" v-show="mdShow">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">
                        
                    </div>
                    <button class="md-close" @click="close()">关闭</button>
                </div> 
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div> 
                    <div class="btn-wrap" @click="close()">
                        <slot name="btnGroup"></slot>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="mdShow" @click="close()"></div>
</div>
</template>

<script>
export default {
  props:["mdShow"],
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      close(){
          this.$emit('close');
      }
  }
}
</script>