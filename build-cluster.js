//@req(nodeGroup, path)

var envName = '${env.envName}', 
resp = jelastic.env.control.GetEnvInfo(envName, session),
nodes = resp.nodes, 
IPs = [];

for (var i = 0; i < nodes.length; i++) { 
  if (nodes[i].nodeGroup != nodeGroup) continue; 
  IPs.push(nodes[i].address + ':' + path);
} 

for (var i = 0; i < nodes.length; i++) { 
    if (nodes[i].nodeGroup != nodeGroup) continue; 
    jelastic.env.control.SetDockerEnvVars(envName, session, nodes[i].id, '{"SERVERS":'+IPs.join(' ')+'}');
}



return {
    result: 0
}
