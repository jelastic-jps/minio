//@auth
//@req(nodeGroup, volumePath)

var envName = '${env.envName}', 
nodes = jelastic.env.control.GetEnvInfo(envName, session).nodes,
IPs = [], resp = [];

for (var i = 0; i < nodes.length; i++) { 
  if (nodes[i].nodeGroup != nodeGroup) continue; 
  IPs.push(nodes[i].address + ':' + volumePath);
}

//if there is only one server then we should specify only volumePath w/o IP
if (IPs.length == 1) IPs[0] = volumePath;
  
for (var i = 0; i < nodes.length; i++) { 
      if (nodes[i].nodeGroup != nodeGroup) continue; 
      resp.push(jelastic.env.control.SetDockerRunCmd(envName, session, nodes[i].id, "server " + IPs.join(' ') + " --address :$PORT"));
}


return {
    result: 0,
    responses: resp
}
