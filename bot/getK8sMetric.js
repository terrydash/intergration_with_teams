
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
// kc.loadFromDefault();
kc.loadFromFile("./kubeconfig")

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
function getPods(namespace) {
   return k8sApi.listNamespacedPod(namespace)
}

module.exports = getPods