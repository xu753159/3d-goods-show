// import uiJson from './filename.json' 
import {modeldata, modelOption} from './guitar-data'
export function getModel() {
    let ui = {
        modeldata,
        modelOption,
        landmarkid: 8,
        addLandMark: () => {
            ui.landmarkid += 1
        },
        save:()=>{
            ui.sysKey +=1
        },
        sysKey: 0,
        replay: () => {
            ui.sysKey += 1
        },
        addTips:()=>{

        }
    }
    return ui
}

export function setupPanel (gui, ui) {
    let camera = gui.addFolder('Camera')
    for (let i = 0; i < ui.modeldata.camera.length; i++) {
        let fc = camera.addFolder('Cameraposition'+i)
            fc.add(ui.modeldata.camera[i].position, 'x', -200, 200).step(0.01)
            fc.add(ui.modeldata.camera[i].position, 'y', -200, 500).step(0.1)
            fc.add(ui.modeldata.camera[i].position, 'z', -200, 200).step(0.01)
        fc.close()
        let fr = camera.addFolder('Camerarotation'+i)
            fr.add(ui.modeldata.camera[i].rotation, 'x', -5, 5).step(0.01)
            fr.add(ui.modeldata.camera[i].rotation, 'y', -5, 5).step(0.01)
            fr.add(ui.modeldata.camera[i].rotation, 'z', -5, 5).step(0.01)
        fr.close()
    }
    camera.close()

   
    let lights =gui.addFolder("light1")
    for (let i = 0; i < ui.modeldata.lights.length; i++) {
        let light = lights.addFolder(ui.modeldata.lights[i].type+'position'+i)
        light.add(ui.modeldata.lights[i].position,'x',-500,500).step(1)
        light.add(ui.modeldata.lights[i].position,'y',-500,500).step(1)
        light.add(ui.modeldata.lights[i].position,'z',-500,500).step(1)
        light.close
    }
    lights.close()
    let modelList =gui.addFolder("modelList")
    for (let i = 0; i < ui.modeldata.modelList.length; i++) {
        let modelposition =modelList.addFolder("position"+ui.modeldata.modelList[i].id)
        modelposition.add(ui.modeldata.modelList[i].position,'x',-1000,1000).step(1)
        modelposition.add(ui.modeldata.modelList[i].position,'y',-1000,1000).step(1)
        modelposition.add(ui.modeldata.modelList[i].position,'z',-1000,1000).step(1)
        modelposition.close()

        let modelrotation =modelList.addFolder("rotation"+ui.modeldata.modelList[i].id)
        modelrotation.add(ui.modeldata.modelList[i].rotation,'x',-1000,1000).step(1)
        modelrotation.add(ui.modeldata.modelList[i].rotation,'y',-1000,1000).step(1)
        modelrotation.add(ui.modeldata.modelList[i].rotation,'z',-1000,1000).step(1)
        modelrotation.close()
        
    }
    modelList.close()
    
    // let audio =gui.addFolder("audio")
    // for (let i = 0; i < ui.modeldata.audioList.length; i++) {
        
    //     let audio1 =audio.addFolder("position"+ui.modeldata.audioList[i].type+i)
    //     audio1.add(ui.modeldata.audioList[i].position,'x',-1000,1000).step(1)
    //     audio1.add(ui.modeldata.audioList[i].position,'y',-1000,1000).step(1)
    //     audio1.add(ui.modeldata.audioList[i].position,'z',-1000,1000).step(1)
    //     audio1.close()
    // }
    // audio.close()
    // let ft = gui.addFolder('TV')
    // ft.add(ui.modeldata.telList[0].position, 'x', -200, 200).step(0.01)
    // ft.add(ui.modeldata.telList[0].position, 'y', -200, 500).step(0.01)
    // ft.add(ui.modeldata.telList[0].position, 'z', -200, 200).step(0.01)
    // ft.close()

    // let landmarklist = gui.addFolder("地面标记")
    // for (let i in ui.modeldata.landmarklist)
    // {
    //     let landmark = ui.modeldata.landmarklist[i]
    //     // console.log('landmark', landmark)
    //     let landmarkF = landmarklist.addFolder(landmark.id)
    //     let landmarkposition = landmarkF.addFolder('标记位置')
    //     landmarkposition.add(landmark.landmarkposipostion, 'x',-1000,1000).step(1)
    //     landmarkposition.add(landmark.landmarkposipostion, 'y',-1000,1000).step(1)
    //     landmarkposition.add(landmark.landmarkposipostion, 'z',-1000,1000).step(1)
    //     landmarkposition.close()
    //     let position = landmarkF.addFolder('位置')
    //     position.add(landmark.position, 'x',-1000,1000).step(1)
    //     position.add(landmark.position, 'y',-1000,1000).step(1)
    //     position.add(landmark.position, 'z',-1000,1000).step(1)
    //     position.close()
    //     let rotaion = landmarkF.addFolder('转向')
    //     rotaion.add(landmark.rotation, 'x', -50, 50).step(0.01)
    //     rotaion.add(landmark.rotation, 'y', -50, 50).step(0.01)
    //     rotaion.add(landmark.rotation, 'z', -50, 50).step(0.01)
    //     rotaion.close()
    //     landmarkF
    //     landmarkF.close()
    // }
    // let addbt = landmarklist.add(ui, 'addLandMark')
    // addbt.onFinishChange(function(value){
    //     console.log("onChange:" + value)
    //     let newLandMark = {
    //         id: ui.modeldata.landmarklist.length,
    //         landmarkposipostion: { x: 0, y: 10, z: 0 },
    //         position: { x: 0, y: 50, z: 0 },
    //         rotation: { x: 0, y: 0, z: 0 },
    //     }
    //     ui.modeldata.landmarklist.push(
    //         newLandMark
    //     )
    //     let landmarkF = landmarklist.addFolder(newLandMark.id)
    //     let landmarkposition = landmarkF.addFolder('标记位置')
    //     landmarkposition.add(newLandMark.landmarkposipostion, 'x',-1000,1000).step(1)
    //     landmarkposition.add(newLandMark.landmarkposipostion, 'y',-1000,1000).step(1)
    //     landmarkposition.add(newLandMark.landmarkposipostion, 'z',-1000,1000).step(1)
    //     landmarkposition.close()
    //     let position = landmarkF.addFolder('位置')
    //     position.add(newLandMark.position, 'x',-1000,1000).step(1)
    //     position.add(newLandMark.position, 'y',-1000,1000).step(1)
    //     position.add(newLandMark.position, 'z',-1000,1000).step(1)
    //     position.close()
    //     let rotaion = landmarkF.addFolder('转向')
    //     rotaion.add(newLandMark.rotation, 'x', -50, 50).step(0.01)
    //     rotaion.add(newLandMark.rotation, 'y', -50, 50).step(0.01)
    //     rotaion.add(newLandMark.rotation, 'z', -50, 50).step(0.01)
    //     rotaion.close()
    // })

    // landmarklist.close()

    // let Tipslist = gui.addFolder("提示信息")
    // // console.log("提示信息：", ui.Tipslist)
    // for (let i in ui.modeldata.Tipslist) {
    //     let Tips = ui.modeldata.Tipslist[i]
    //     // console.log('Tipslist', Tips)
    //     let TipsF = Tipslist.addFolder(Tips.id)
    //     let TipsFposition = TipsF.addFolder('位置')
    //     TipsFposition.add(Tips.position, 'x', -1000, 1000).step(1)
    //     TipsFposition.add(Tips.position, 'y', -1000, 1000).step(1)
    //     TipsFposition.add(Tips.position, 'z', -1000, 1000).step(1)
    //     TipsFposition.close()
    //     let TipsFrotation = TipsF.addFolder('角度')
    //     TipsFrotation.add(Tips.rotation, 'x', -1000, 1000).step(0.01)
    //     TipsFrotation.add(Tips.rotation, 'y', -1000, 1000).step(0.01)
    //     TipsFrotation.add(Tips.rotation, 'z', -1000, 1000).step(0.01)
    //     TipsFrotation.close()
    //     let TipsFtitle = TipsF.addFolder('标题')
    //     TipsFtitle.add(Tips, 'title', '');
    //     TipsFtitle.close()
    //     let TipsFdescribe = TipsF.addFolder('文本内容')
    //     TipsFdescribe.add(Tips, 'describe', '');
    //     TipsFdescribe.close()
    //     TipsF.close()
    // }
    //     let addTips = Tipslist.add(ui,'addTips')
    //     addTips.onFinishChange(function(){
    //         let newTips = {
    //             id: ui.modeldata.Tipslist.length,
    //             type: "tips",
    //             tipsShow: false,
    //             position: {
    //                 x: 0,
    //                 y: 50,
    //                 z: 0
    //             },
    //             rotation: {
    //                 x: 0,
    //                 y: -1.57,
    //                 z: 0
    //             },
    //             title: "提示",
    //             describe: "这是提示详情",
    //         }
    //         ui.modeldata.Tipslist.push(newTips)
    //         let TipsF = Tipslist.addFolder(newTips.id)
    //         let TipsFposition = TipsF.addFolder('位置')
    //         TipsFposition.add(newTips.position, 'x', -1000, 1000).step(1)
    //         TipsFposition.add(newTips.position, 'y', -1000, 1000).step(1)
    //         TipsFposition.add(newTips.position, 'z', -1000, 1000).step(1)
    //         TipsFposition.close()
    //         let TipsFrotation = TipsF.addFolder('角度')
    //         TipsFrotation.add(newTips.rotation, 'x', -1000, 1000).step(0.01)
    //         TipsFrotation.add(newTips.rotation, 'y', -1000, 1000).step(0.01)
    //         TipsFrotation.add(newTips.rotation, 'z', -1000, 1000).step(0.01)
    //         TipsFrotation.close()
    //         let TipsFtitle = TipsF.addFolder('标题')
    //         TipsFtitle.add(newTips, 'title', '');
    //         TipsFtitle.close()
    //         let TipsFdescribe = TipsF.addFolder('文本内容')
    //         TipsFdescribe.add(newTips, 'describe', '');
    //         TipsFdescribe.close()
    //         TipsF.close()
    //         // console.log("tips",ui.Tipslist)
    //     }) 
    // Tipslist.close()
    // 保存json 文件
    var controller = gui.add(ui, 'save')
    controller.onFinishChange(function(){
        if (typeof ui === "object") {
           var data = JSON.stringify(ui.modeldata, undefined, 4)
        }
        var blob = new Blob([data], {type: 'text/json'}),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = "filename.json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e)
    })
    gui.add(ui, 'replay')
}
