let vueComs = {}

let vueContext = require.context('./', true, /\.vue$/)
// console.log(vueContext.keys())
vueContext.keys().forEach(path => {
  let com = vueContext(path).default
  vueComs[com.name] = com
  exports[com.name] = com
})

// let loaderContext = require.context('./threex/loaders', false, /\.js$/)
// loaderContext.keys().forEach(path => {
//   let com = loaderContext(path).default
//   // fix: uglify would kill the function name
//   let name = path.match(/([^/]+)\.js$/)[1]
//   exports[name] = com
// })

 exports.install= Vue => {

  let EventBus = new Vue();
  let Global = {};

  Object.defineProperties(Vue.prototype, {
    $bus: {
      get: function () {
        return EventBus
      }
    },
    $global: {
      get: function () {
        return Global
      }
    }
  })

  Object.keys(vueComs).forEach(k => {
    // fix: name 'object3d' is required,
    // or it would be parsed to 'object-3-d' somewhere else
    let rk
    if (k === 'Object3D') rk = 'object3d'
    if (rk) Vue.component(rk, vueComs[k])
    Vue.component(k, vueComs[k])
  })
}
