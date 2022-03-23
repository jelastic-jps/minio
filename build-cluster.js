//@auth
//@req(nodeGroup, volumePath, port)

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
      resp.push(jelastic.env.file.ReplaceInBody(envName, session, '/etc/default/minio', '^MINIO_VOLUMES=.*', "MINIO_VOLUMES=" + servers.join(' ') + " --address :" + port + " --console-address :" + consolePort, 1, null, null, false, nodes[i].id ));
}

return {
    result: 0,
    responses: resp
}
