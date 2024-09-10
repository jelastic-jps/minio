//
var envName = getParam('envName'),
envDomain = getParam('envDomain'),
scriptAction = getParam('action'),
scriptName = scriptAction == 'uninstall' ? 'undeployLE.sh' : 'deployLE.sh',
respEnvInfo = jelastic.env.control.GetEnvInfo(envName, session),
masterNode = respEnvInfo.nodes.filter(node => (node.nodeGroup == 'cp' && node.ismaster))[0],
resp = "",
domains = [];

function copyFileToNodes( scrFile, dstFile ){
      var key = "";
      resp = api.environment.file.Read({
        envName: envName,
        session: session,
            path: scrFile,
        nodeid: masterNode.id
     });
    if (resp.result != 0) return resp;
      key = resp.body;
      resp =  api.environment.file.Write({
        envName: envName,
        session: session,
        path: dstFile,
        nodeGroup: nodeGroup,
        nodeid: "-1",
        body: key
      });
    return resp;
}

if (scriptAction != 'uninstall'){
    // copy LE cert
    copyFileToNodes("/var/lib/jelastic/keys/privkey.pem", "/home/jelastic/.minio/certs/host/private.key");
    copyFileToNodes("/var/lib/jelastic/keys/fullchain.pem", "/home/jelastic/.minio/certs/host/public.crt");
    // copy minio cert
    respEnvInfo.nodes.forEach((element) => domains.push(element.extIPs ? element.extIPs[0] : element.address));
    resp = api.env.control.ExecCmdById(envName, session, masterNode.id, toJSON([{ command:'/usr/local/bin/certgen -duration 87600h -host ' + domains.join(",") + '>/dev/null'}]), true);
    copyFileToNodes("/root/private.key", "/home/jelastic/.minio/certs/private.key");
    copyFileToNodes("/root/public.crt", "/home/jelastic/.minio/certs/public.crt");
}

//executing custom deployment hook script on cp nodes
resp =  api.env.control.ExecCmdByGroup(envName, session, "cp", toJSON([{ command:'/bin/bash /root/' + scriptName}]), true);
if (resp.result != 0) return resp;

if (scriptAction == 'install'){
    return resp;
} else {
    return api.env.control.RestartServices({
        envName: envName,
        session: session,
        nodeGroup: "cp",
        isSequential: false
    });
}
