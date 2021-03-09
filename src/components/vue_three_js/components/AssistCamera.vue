
<script>
import { OrthographicCamera, Vector3 } from "three";
import Object3D from "./Object3D";

export default {
  name: "AssistCamera",
  mixins: [Object3D],
  props: {
    obj: { type: Object },
  },

  data() {
    let curObj = this.obj;
    // const { w, h } = this.$global.rendererSize // fixme
    if (!curObj) {
      curObj = new OrthographicCamera(-300, 300, 300, -300, 1, 2000);
      let position = new Vector3(0, 200, 0);
      curObj.lookAt(position);
    }
    curObj.name = curObj.name || curObj.type;

    return { curObj};
  },
  mounted() {
    this.$global.assistCamera = this.curObj;
  },
  destroyed() {
    this.curObj=null
    this.$global.assistCamera = null;
  },
  
  
};
</script>