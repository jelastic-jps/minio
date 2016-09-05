//@auth 

if (${settings.volumes} == 0) return {result:0};

var resp = jelastic.env.control.GetEnvInfo('${env.envName}', session); 
var nodes = resp.nodes, volumes = '', n = 0; 

for (var i = 0; i < nodes.length; i++) { 
  if (nodes[i].nodeGroup != 'extra') continue; 
  var volume = '/export/volume' + n++; 
  volumes += ' ' + volume; 
  resp = jelastic.env.control.AddDockerVolumeByGroup('${env.envName}', session, 'cp', volume); 
  resp = jelastic.env.file.AddMountPointByGroup('${env.envName}', session, 'cp', volume, 'nfs', null, '/data', nodes[i].id, '', false); 
} 

resp = jelastic.env.control.SetDockerRunCmd('${env.envName}', session, ${nodes.cp.first.id}, '--address :80' + volumes); 
return resp;
