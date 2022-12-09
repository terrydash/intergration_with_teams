const getPods = require("./getK8sMetric")
var r = getPods("default")
r.then(res => {
    res.body.items.forEach(item => {
        console.log(item.metadata.name)
    })

})






