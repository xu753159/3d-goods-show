// eslint-disable-next-line no-unused-vars
import Dexie from 'dexie'
self.onmessage = async  (e) => {
    // console.log("Worker>> 得到读取的的数据 e.data:", e.data)
     await afferent(e.data)
     self.postMessage("worker")
     self.close();
}

async function afferent(model) {
  var db = new Dexie("ModelDatabase");
  db.version(1).stores({
    // 创建表
    modelList: "++id,name,model,edition",
  });
  // console.log("worker>>一、 拿到的模型:model",model)
  await db.transaction("rw", [db.modelList], async () => {
    await db.modelList
      .add(model).then(()=>{
        // console.log("Worker>> 二、数据库 保存成功",res)
      })
      .catch((err) => {
        console.log("Worker>> ~~保存失败", err);
      });
     
  })
  .catch((err) => {
    console.error("Worker>> 事务错误 :( " + err.stack);
  }).then(()=>{
    // console.log("Worker>> 三、事务完成后：")
  });
  db.close()
}
