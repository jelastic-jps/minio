//@auth
//@req(nodeGroup, path)

var envName = '${env.envName}', 
resp = jelastic.env.control.GetEnvInfo(envName, session),
nodes = resp.nodes, 
IPs = [];

for (var i = 0; i < nodes.length; i++) { 
  if (nodes[i].nodeGroup != nodeGroup) continue; 
  IPs.push(nodes[i].address + ':' + path);
} 

var servers = '{"SERVERS":"'+IPs.join(' ')+'"}';
resp = [];
for (var i = 0; i < nodes.length; i++) { 
    if (nodes[i].nodeGroup != nodeGroup) continue; 
    resp.push(jelastic.env.control.SetDockerRunCmd(envName, session, nodes[i].id, servers + " --address :$PORT"));
}

return {
    result: 0,
    responses: resp
}
