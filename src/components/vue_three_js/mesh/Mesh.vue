<script>
import Object3D from "../components/Object3D";

export default {
  name: "Mesh",
  mixins: [Object3D],
  props: {
    type: { type: String, default: "Mesh" },
    takeposition: {
      type: Object,
      default() {
        return {};
      },
    },
    takerotation: {
      type: Object,
      default() {
        return {};
      },
    },
    index:Number
  },

  provide() {
    return { meshVm: this };
  },
  created() {
    if (this.takeposition && this.takerotation) {
      this.curObj.takeposition = this.takeposition;
      this.curObj.takerotation = this.takerotation;
      this.curObj.index = this.index
    }
  },
};
</script>
