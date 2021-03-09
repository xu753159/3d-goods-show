 let modeldata={
    camera: [{
        type: "相机",
        position: {
            x:50,
            y:120,
            z:50
        },
        rotation: {
            x: 0.05,
            y: 0.8,
            z: 0.02
        }
    }],
    lights: [{
            type:'光线1',
            position: {
                x: -90,
                y: 60,
                z: 50
            }
        },
        {
            type:'光线2',
            position: {
                x: 90,
                y: 60,
                z: -50
            }
        },
        {
            type:'光线3',
            position: {
                x: 90,
                y: 60,
                z: -50
            }

        }
    ],
    // 声音


    modelList: [
        {
          id: 17,
          modelsrc: "necklace.FBX",
            position: {x:0,y:70,z:0,},
          renderorder:0,
            rotation:{x:0,y:0,z:0},
          audiosrc:null
        },
      ],

}
 let modelOption={

        modelOptions:{
          scale:1
        },

}
// export default modeldata
export{modeldata,modelOption}
