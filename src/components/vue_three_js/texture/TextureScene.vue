<script>
// import {  CubeTextureLoader } from 'three'
import * as THREE from 'three'
import Base from '../components/Base'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

export default {
  name: 'TextureScene',
  mixins: [Base],
  inject: ['scene'],
  props: {
    url: String,
    baseUrl:String,
    options: { type: Object, default: () => ({}) }
  },
  mounted () {
    console.log(this.scene)
    let textureLoader =new THREE.TextureLoader()
    textureLoader.load(this.url,(texture)=>{
      texture.encoding=THREE.sRGBEncoding
      this.scene.background=texture
    })
    // const pmremGenerator = new THREE.PMREMGenerator(  this.$global.renderer );
		// pmremGenerator.compileEquirectangularShader();
    //  new RGBELoader()
    //       .setDataType( THREE.UnsignedByteType )
		// 			.setPath( this.baseUrl )
		// 			.load( this.url,  ( texture ) => {

		// 				const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

		// 				this.scene.background = envMap;
		// 				// this.scene.environment = envMap;

		// 				texture.dispose();
    //         pmremGenerator.dispose();

    //       })

  },
  beforeDestroy () {
 
  },
  destroyed () {
 
  }
}
</script>
