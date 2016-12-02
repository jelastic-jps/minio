//@auth
//@req(nodeGroup, volumePath)

var envName = '${env.envName}', 
nodes = jelastic.env.control.GetEnvInfo(envName, session).nodes,
servers = [], resp = [], protocol = 'http://'; //protocol = 'http' + (${env.ssl} ? 's' : '') + '://';

for (var i = 0; i < nodes.length; i++) { 
  if (nodes[i].nodeGroup != nodeGroup) continue; 
  servers.push(protocol + nodes[i].address + volumePath);
}

//if there is only one server then we should specify only volumePath w/o IP
if (servers.length == 1) servers[0] = volumePath;
  
for (var i = 0; i < nodes.length; i++) { 
      if (nodes[i].nodeGroup != nodeGroup) continue; 
      resp.push(jelastic.env.control.SetDockerRunCmd(envName, session, nodes[i].id, "server " + servers.join(' ') + " --address :$PORT"));
}

return {
    result: 0,
    responses: resp
}
