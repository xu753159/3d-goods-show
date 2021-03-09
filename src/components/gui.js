export function getModel () {
  let ui = {
    camera: {
      x: -35, y: 50, z:-191
    },
    rotation: {
      x: 0, y: -3.14, z: 0
    },
    television: {
      x: -77, y: 40, z:68.5
    },
    tvratation: {
      x: 0, y: 3.14, z:0
    },
    sprite:{
      x: 30, y: 40, z:7
    },
    ocean: {
      y: -200
    },
    scale: {
      model1: 60,
      model2: 0.05,
    },
    light1:{
      x:-90,y:60,z:50
    },
    light2:{
      x:90,y:60,z:-50
    },
    light3:{
      x:90,y:60,z:-50
    },
    light4:{
      x:90,y:60,z:-50
    },
    audio1:{
      x:-50,y:50,z:0
    },
    audio2:{
      x:30,y:40,z:70
    },
    sysKey: 0,
    replay: () => {
      ui.sysKey += 1
    }
  }
  return ui
}

export function setupPanel (gui, ui) {
  let fc = gui.addFolder('Camera')
  fc.add(ui.camera, 'x', -200, 200).step(0.01)
  fc.add(ui.camera, 'y', -200, 500).step(0.1)
  fc.add(ui.camera, 'z', -200, 200).step(0.01)
  fc.close()

  let fr = gui.addFolder('Rotation')
  fr.add(ui.rotation, 'x', -5, 5).step(0.01)
  fr.add(ui.rotation, 'y', -5, 5).step(0.01)
  fr.add(ui.rotation, 'z', -5, 5).step(0.01)
  fr.close()

  let ft = gui.addFolder('TV')
  ft.add(ui.television, 'x', -200, 200).step(0.01)
  ft.add(ui.television, 'y', -200, 500).step(0.01)
  ft.add(ui.television, 'z', -200, 200).step(0.01)
  ft.close()

  let ftr = gui.addFolder('TVRotation')
  ftr.add(ui.tvratation, 'x', -50, 50).step(0.01)
  ftr.add(ui.tvratation, 'y', -50, 50).step(0.01)
  ftr.add(ui.tvratation, 'z', -50, 50).step(0.01)
  ftr.close()

  let sprite = gui.addFolder('sprite')
  sprite.add(ui.sprite, 'x', -50, 50).step(0.01)
  sprite.add(ui.sprite, 'y', -50, 50).step(0.01)
  sprite.add(ui.sprite, 'z', -50, 50).step(0.01)
  sprite.close()

  let fo = gui.addFolder('Ocean')
  fo.add(ui.ocean, 'y', -250, 10).step(0.01)
  fo.close()

  let fs = gui.addFolder('scale')
  fs.add(ui.scale, 'model1', 0.01, 200).step(0.01)
  fs.add(ui.scale, 'model2', 0.01, 500).step(0.01)
  fs.close()

  let light1 =gui.addFolder("light1")
  light1.add(ui.light1,'x',-500,500).step(1)
  light1.add(ui.light1,'y',-500,500).step(1)
  light1.add(ui.light1,'z',-500,500).step(1)
  light1.close()

  let light2 =gui.addFolder("light2")
  light2.add(ui.light2,'x',-500,500).step(1)
  light2.add(ui.light2,'y',-500,500).step(1)
  light2.add(ui.light2,'z',-500,500).step(1)
  light2.close()
  let light3 =gui.addFolder("light3")
  light3.add(ui.light3,'x',-500,500).step(1)
  light3.add(ui.light3,'y',-500,500).step(1)
  light3.add(ui.light3,'z',-500,500).step(1)
  light3.close()
  let light4 =gui.addFolder("light4")
  light4.add(ui.light4,'x',-500,500).step(1)
  light4.add(ui.light4,'y',-500,500).step(1)
  light4.add(ui.light4,'z',-500,500).step(1)
  light4.close()

  let audio1 =gui.addFolder("audio1")
  audio1.add(ui.audio1,'x',-1000,1000).step(1)
  audio1.add(ui.audio1,'y',-1000,1000).step(1)
  audio1.add(ui.audio1,'z',-1000,1000).step(1)
  audio1.close()

  let audio2 =gui.addFolder("audio2")
  audio2.add(ui.audio2,'x',-1000,1000).step(1)
  audio2.add(ui.audio2,'y',-1000,1000).step(1)
  audio2.add(ui.audio2,'z',-1000,1000).step(1)
  audio2.close()
  gui.add(ui, 'replay')
}
