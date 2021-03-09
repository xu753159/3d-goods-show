<template>
  <Object3D>
    <slot></slot>
  </Object3D>
</template>

<script>
    import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
    import Object3D from './../components/Object3D'
    import * as THREE from 'three'
    import {Euler} from "three";
    export default {
        name:'PointerLockControls',
        mixins: [Object3D],
        components: { Object3D },
        data () {
            return {
                controls: null,
                timer: null,
                frame: null,
                moveForward : false,
                moveBackward : false,
                moveLeft : false,
                moveRight : false,

                prevTime : null,
                velocity : null,
                direction : null,

                touches : null,
                state : -1,
                rotateStart : null,
                rotateEnd : null,
                rotateDelta : null,

                panStart : null,
                panEnd : null,
                panDelta : null,

                dollyStart : null,
                dollyEnd : null,
                dollyDelta : null,

                //sphericalDelta: null,

                enabled : true,
                STATE : {
                    NONE: - 1,
                    ROTATE: 0,
                    DOLLY: 1,
                    PAN: 2,
                    TOUCH_ROTATE: 3,
                    TOUCH_PAN: 4,
                    TOUCH_DOLLY_PAN: 5,
                    TOUCH_DOLLY_ROTATE: 6
                },
                changeEvent : { type: 'change' },
                startEvent : { type: 'start' },
                endEvent : { type: 'end' },

                enableZoom : true,
                zoomSpeed : 0.8,

                // Set to false to disable rotating
                enableRotate : true,
                rotateSpeed : 0.8,

                // Set to false to disable panning
                enablePan : true,
                panSpeed : 0.8,
                objects:[]
            }
        },
        props:{
            wallname:String,
            renderComplete:{
                type:Boolean,
                default(){
                    return false
                }
            }
        },
        created() {
            this.timer = new THREE.Clock()
            this.prevTime = performance.now();
            this.velocity = new THREE.Vector3();
            this.direction = new THREE.Vector3();
            this.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }
            this.rotateStart = new THREE.Vector2();
            this.rotateEnd = new THREE.Vector2();
            this.rotateDelta = new THREE.Vector2();

            this.panStart = new THREE.Vector2();
            this.panEnd = new THREE.Vector2();
            this.panDelta = new THREE.Vector2();

            this.dollyStart = new THREE.Vector2();
            this.dollyEnd = new THREE.Vector2();
            this.dollyDelta = new THREE.Vector2();

            //this.sphericalDelta = new Spherical();

        },

        mounted () {

            let domElement = this.$global.rendererDom // fixme
            this.controls = new PointerLockControls(this.$global.camera, domElement)
            // this.controls.lock()
            // this.controls.isLocked = true

            // domElement.addEventListener( 'mousedown', this.onMouseDown, false );
            // domElement.addEventListener( 'mouseup', this.onMouseUp , false );
            // document.addEventListener( 'keydown', this.onKeyDown, false );
            // document.addEventListener( 'keyup', this.onKeyUp, false );

            this.$bus.$on( 'mouse-down', this.onMouseDown);
            this.$bus.$on( 'mouse-up', this.onMouseUp);
            this.$bus.$on( 'key-down', this.onKeyDown);
            this.$bus.$on( 'key-up', this.onKeyUp);
            this.$bus.$on( 'touch-start', this.onTouchStart);
            this.$bus.$on( 'touch-end', this.onTouchEnd);
            this.$bus.$on( 'touch-move', this.onTouchMove);

            this.animate()
        },

        beforeDestroy () {
            this.objects.length = 0
            this.objects = null
            if (this.frame) {
                cancelAnimationFrame(this.frame)
            }
            if (this.controls) {
                this.controls.dispose()
                this.controls.isLocked = false
                this.controls = null
            }

            this.$bus.$off( 'mouse-down', this.onMouseDown);
            this.$bus.$off( 'mouse-up', this.onMouseUp);
            this.$bus.$off( 'key-down', this.onKeyDown);
            this.$bus.$off( 'key-up', this.onKeyUp);
            this.$bus.$off( 'touch-start', this.onTouchStart);
            this.$bus.$off( 'touch-end', this.onTouchEnd);
            this.$bus.$off( 'touch-move', this.onTouchMove);
        },

        methods: {
            animate () {
                this.frame = requestAnimationFrame(this.animate)
                const time = performance.now();
                if(!this.moveForward && !this.moveLeft && !this.moveBackward && !this.moveRight && this.velocity.x==0 && this.velocity.z == 0){
                   this.prevTime = time;
                     return
                }
                let delta = ( time - this.prevTime ) / 1000;
                if(delta>0.1){ //帧率不够限制移动距离 事件
                     delta = 0.1
                }

                this.velocity.x -= this.velocity.x * 10.0 * delta;
                this.velocity.z -= this.velocity.z * 10.0 * delta;

                this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
                this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
                this.direction.normalize(); // this ensures consistent movements in all this.directions

                if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * 600.0 * delta;
                if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * 600.0 * delta;
                const v = new THREE.Vector3(0,0,0)
                this.controls.getDirection(v)
                // console.log("相机方向：",v.x,v.y,v.z)
                if(v.y==1 || v.y == -1){
                    v.x=1
                    v.z=0
                    v.y=0
                }
                // 记录上一次的相机位置
                let raycasterFront = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( v.x, 0, v.z ), 0, 8 ),
					raycasterAfter = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -v.x, 0, -v.z ), 0, 8 ),
					raycasterleft = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( v.z, 0, -v.x ), 0, 8 ),
                    raycasterRight = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -v.z, 0, v.x ), 0, 8 );
                    //射线位置
                    var position = new THREE.Vector3()
                    position.copy(this.controls.getObject().position)
                    position.y = 5;
                    raycasterleft.ray.origin.copy( position )
					raycasterRight.ray.origin.copy( position )
					raycasterFront.ray.origin.copy( position )
                    raycasterAfter.ray.origin.copy( position )
                    var intersectionsleft = false
                    var intersectionsRight = false;
                    var intersectionsFront = false;
                    var intersectionsAfter  = false

                    
                        if(!this.objects.length){
                            this.objectsList()
                        }
                        //检测是否碰撞物体
                         intersectionsleft = raycasterleft.intersectObjects( this.objects).length>0
                         intersectionsRight = raycasterRight.intersectObjects( this.objects).length>0
                         intersectionsFront = raycasterFront.intersectObjects( this.objects).length>0
                         intersectionsAfter = raycasterAfter.intersectObjects( this.objects).length>0
                        //console.log("left",intersectionsleft ,"right",intersectionsRight ,"front",intersectionsFront ,"After",intersectionsAfter )
                    


                 if ( this.moveForward && intersectionsFront || this.moveBackward && intersectionsAfter )
                 {
                     this.velocity.z =0
                 }else{
                       this.velocity.z -= this.direction.z * 600.0 * delta;
                 }


                if ( this.moveLeft && intersectionsleft || this.moveRight && intersectionsRight)
                {
                    this.velocity.x = 0
                }else{
                    this.velocity.x -= this.direction.x * 600.0 * delta;
                }


                this.controls.moveRight( - this.velocity.x * delta );
                this.controls.moveForward( - this.velocity.z * delta );

                this.prevTime = time;

            },
            onKeyDown ( event ) {

                // console.log('onKeyDown', event)
                switch ( event.keyCode ) {

                    case 38: // up
                    case 87: // w
                        this.moveForward = true;
                        break;

                    case 37: // left
                    case 65: // a
                        this.moveLeft = true;
                        break;

                    case 40: // down
                    case 83: // s
                        this.moveBackward = true;
                        break;

                    case 39: // right
                    case 68: // d
                        this.moveRight = true;
                        break;
                    //
                    // case 32: // space
                    //     if ( this.canJump === true ) this.velocity.y += 350;
                    //     this.canJump = false;
                    //     break;

                }

            },
            onKeyUp ( event ) {

                // console.log('onKeyUp', event)
                switch ( event.keyCode ) {

                    case 38: // up
                    case 87: // w
                        this.moveForward = false;
                        break;

                    case 37: // left
                    case 65: // a
                        this.moveLeft = false;
                        break;

                    case 40: // down
                    case 83: // s
                        this.moveBackward = false;
                        break;

                    case 39: // right
                    case 68: // d
                        this.moveRight = false;
                        break;
                }

            },
            onMouseDown()
            {

                this.lock();

            },
            onMouseUp()
            {

                this.unlock();

            },
            onTouchStart( event ) {

                if ( this.enabled === false ) return;

                this.lock();
                event.preventDefault(); // prevent scrolling

                switch ( event.touches.length ) {

                    case 1:

                        switch ( this.touches.ONE ) {

                            case THREE.TOUCH.ROTATE:

                                this.handleTouchStartRotate( event );

                                this.state = this.STATE.TOUCH_ROTATE;

                                break;

                            case THREE.TOUCH.PAN:

                                if ( this.enablePan === false ) return;

                                this.handleTouchStartPan( event );

                                this.state = this.STATE.TOUCH_PAN;

                                break;

                            default:

                                this.state = this.STATE.NONE;

                        }

                        break;

                    case 2:

                        switch ( this.touches.TWO ) {

                            case THREE.TOUCH.DOLLY_PAN:

                                if ( this.enableZoom === false && this.enablePan === false ) return;

                                this.handleTouchStartDollyPan( event );

                                this.state = this.STATE.TOUCH_DOLLY_PAN;

                                break;

                            case THREE.TOUCH.DOLLY_ROTATE:

                                if ( this.enableZoom === false && this.enableRotate === false ) return;

                                this.handleTouchStartDollyRotate( event );

                                this.state = this.STATE.TOUCH_DOLLY_ROTATE;

                                break;

                            default:

                                this.state = this.STATE.NONE;

                        }

                        break;

                    default:

                        this.state = this.STATE.NONE;

                }

                if ( this.state !== this.STATE.NONE ) {

                    this.controls.dispatchEvent( this.startEvent );

                }

            },

            onTouchMove( event ) {

                if ( this.enabled === false ) return;

                event.preventDefault(); // prevent scrolling
                event.stopPropagation();

                switch ( this.state ) {

                    case this.STATE.TOUCH_ROTATE:

                        if ( this.enableRotate === false ) return;

                        this.handleTouchMoveRotate( event );

                        // this.update();

                        break;

                    case this.STATE.TOUCH_PAN:

                        if ( this.enablePan === false ) return;

                        this.handleTouchMovePan( event );

                        // this.update();

                        break;

                    case this.STATE.TOUCH_DOLLY_PAN:

                        if ( this.enableZoom === false && this.enablePan === false ) return;

                        this.handleTouchMoveDollyPan( event );

                        // this.update();

                        break;

                    case this.STATE.TOUCH_DOLLY_ROTATE:

                        if ( this.enableZoom === false && this.enableRotate === false ) return;

                        this.handleTouchMoveDollyRotate( event );

                        // this.update();

                        break;

                    default:

                        this.state = this.STATE.NONE;

                }

            },

            onTouchEnd( event ) {

                if ( this.enabled === false ) return;

                this.unlock();

                this.handleTouchEnd( event );

                this.dispatchEvent( this.endEvent );

                this.state = this.STATE.NONE;

            },

            handleTouchStartRotate( event ) {

                if ( event.touches.length === 1 ) {

                    this.rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

                } else {

                    var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
                    var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

                    this.rotateStart.set( x, y );

                }

            },

            handleTouchStartPan( event ) {

                if ( event.touches.length == 1 ) {

                    this.panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

                } else {

                    var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
                    var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

                    this.panStart.set( x, y );

                }

            },

            handleTouchStartDolly( event ) {

                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

                var distance = Math.sqrt( dx * dx + dy * dy );

                this.dollyStart.set( 0, distance );

            },

            handleTouchStartDollyPan( event ) {

                if ( this.enableZoom ) this.handleTouchStartDolly( event );

                if ( this.enablePan ) this.handleTouchStartPan( event );

            },

            handleTouchStartDollyRotate( event ) {

                if ( this.enableZoom ) this.handleTouchStartDolly( event );

                if ( this.enableRotate ) this.handleTouchStartRotate( event );

            },

            handleTouchMoveRotate( event ) {

                if ( event.touches.length == 1 ) {

                    this.rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

                } else {

                    var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
                    var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

                    this.rotateEnd.set( x, y );

                }

                this.rotateDelta.subVectors( this.rotateEnd, this.rotateStart ).multiplyScalar( this.rotateSpeed );

                var element = this.$global.rendererDom;

                // this.rotateLeft( 2 * Math.PI * this.rotateDelta.x / element.clientHeight ); // yes, height
                //
                // this.rotateUp( 2 * Math.PI * this.rotateDelta.y / element.clientHeight );

                // console.log('quaternion', this.controls.getObject().quaternion )
                var euler = new Euler( 0, 0, 0, 'YXZ' );
                euler.setFromQuaternion( this.controls.getObject().quaternion );

                euler.y += (2 * Math.PI * this.rotateDelta.x / element.clientHeight);
                euler.x += ( 2 * Math.PI * this.rotateDelta.y / element.clientHeight );

                this.controls.getObject().quaternion.setFromEuler( euler );

                this.rotateStart.copy( this.rotateEnd );

            },

            handleTouchMovePan( event ) {

                if ( event.touches.length == 1 ) {

                    this.panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

                } else {

                    var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
                    var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

                    this.panEnd.set( x, y );

                }

                this.panDelta.subVectors( this.panEnd, this.panStart ).multiplyScalar( this.panSpeed );

                //this.pan( this.panDelta.x, this.panDelta.y );
                this.controls.moveForward(0 - this.panDelta.y);
                this.controls.moveRight(this.panDelta.x);

                this.panStart.copy( this.panEnd );

            },

            handleTouchMoveDolly( event ) {

                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

                var distance = Math.sqrt( dx * dx + dy * dy );

                this.dollyEnd.set( 0, distance );

                this.dollyDelta.set( 0, Math.pow( this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed ) );

                //this.dollyOut( this.dollyDelta.y );
                this.controls.getObject().fov *= this.dollyDelta.y;

                this.dollyStart.copy( this.dollyEnd );

            },

            handleTouchMoveDollyPan( event ) {

                if ( this.enableZoom ) this.handleTouchMoveDolly( event );

                if ( this.enablePan ) this.handleTouchMovePan( event );

            },

            handleTouchMoveDollyRotate( event ) {

                if ( this.enableZoom ) this.handleTouchMoveDolly( event );

                if ( this.enableRotate ) this.handleTouchMoveRotate( event );

            },

            handleTouchEnd( /*event*/ ) {

                // no-op

            },
            lock(){
                this.controls.lock();
            },
            unlock(){
                if (this.controls.isLocked) {
                    this.controls.unlock();
                }
                else{
                    setTimeout(()=>{

                        this.controls.unlock();

                    },200)
                }
            },
            objectsList(){

                this.childrenList(this.$global.scene.children)
            },
            childrenList(childrenList){
                for (const i in childrenList) {
                   if(childrenList[i].name.match(this.wallname)){
                       this.objects.push(childrenList[i])
                   }

                   if(childrenList[i].children){
                       this.childrenList(childrenList[i].children)
                   }else{
                       return false
                   }
                }
            }
        }
    }
</script>
