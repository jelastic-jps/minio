//@auth
//@req(nodeGroup, volumePath, port)

var envName = '${env.envName}',
envDomain = '${env.domain}',
nodes = jelastic.env.control.GetEnvInfo(envName, session).nodes,
servers = [], resp = [],
protocol = '${globals.PROTOCOL:http}' + '://',
hostPort = protocol == 'https://' ? 443 : port;
api.marketplace.console.WriteLog(protocol + hostPort);

for (var i = 0; i < nodes.length; i++) {
  if (nodes[i].nodeGroup != nodeGroup) continue;
  var ttmp = nodes[i].extIPs ? nodes[i].extIPs[0] : nodes[i].address;
  servers.push(protocol + ttmp  +  volumePath);
}

//if there is only one server then we should specify only volumePath w/o IP
if (servers.length == 1) servers[0] = volumePath;
  
for (var i = 0; i < nodes.length; i++) { 
      if (nodes[i].nodeGroup != nodeGroup) continue; 
      resp.push(jelastic.env.file.ReplaceInBody(envName, session, '/etc/default/minio', '^MINIO_VOLUMES=.*', "MINIO_VOLUMES=\"" + servers.join(' ') + "\"", 1, null, null, false, nodes[i].id ));
      resp.push(jelastic.env.file.ReplaceInBody(envName, session, '/etc/default/minio', '^MINIO_OPTS=.*', "MINIO_OPTS=\" --address :" + hostPort + " --console-address :" + consolePort + "\"", 1, null, null, false, nodes[i].id ));
}

return {
    result: 0,
    responses: resp
}
