let modeldata = {
  camera: [{
    type: "相机",
    position: {
      x: -260,
      y: 130,
      z: -183
    },
    rotation: {
      x: 0.6,
      y: 1.3,
      z: 1.5
    }
  }],
  lights: [{
      type: '光线1',
      position: {
        x: -90,
        y: 60,
        z: 50
      }
    },
    {
      type: '光线2',
      position: {
        x: 90,
        y: 60,
        z: -50
      }
    },
    {
      type: '光线3',
      position: {
        x: 90,
        y: 60,
        z: -50
      }

    }
  ],
  modelList: [{
    id: 17,
    modelsrc: "guitar.FBX",
    position: {
      x: 0,
      y: -125,
      z: 0
    },
    renderorder: 0,
    edition: 1,
    audiosrc: "static/SoundPosition2.MP3",
    rotation:{x:0,y:0,z:0}

  }, ],
 
  // 环境贴图球
}
let modelOption = {
  modelOptions: {
    scale: 10
  },
  
 
}
// export default modeldata
export {
  modeldata,
  modelOption
}