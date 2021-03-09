<template>
    <div>
        <transition name="slide-fade">
                <slot></slot>
        </transition>
       
    </div>
</template>
<script>
// import { AtomSpinner } from "epic-spinners";  
// import * as THREE from "three";
export default {
   
    components:{
        // AtomSpinner
    },
    props:{
        renderComplete:{
            type:Boolean,
            default(){
                return false
            }
        },
        
    },
    mounted() {
       
    },
    
    beforeDestroy(){
    }
}
</script>

<style>

</style>