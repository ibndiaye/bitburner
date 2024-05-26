import { getServers } from "getServers.js";

/** @param {NS} ns */
export async function main(ns) {
  let srvs = getServers(ns);
  for (const s of srvs) {
    ns.killall(s);
  }
  deploy(ns, srvs, ns.args[0]);
}

function gainRoot(ns, s) {
  ns.brutessh(s);
  ns.ftpcrack(s);
  ns.relaysmtp(s);
  try {
    ns.nuke(s);
  } catch { }
}

function deploy(ns, servers, target) {
  for (const s of servers) {
    if (!ns.hasRootAccess(s)) {
      gainRoot(ns, s);
    }
    ns.scp("hack.js", s);
    let noOfThreads = Math.floor(ns.getServerMaxRam(s) / ns.getScriptRam("hack.js", "home"));
    ns.exec("hack.js", s, noOfThreads || 1, target)
    ns.tprint("deployed on " + s);
    ns.print("deployed on all servers");
  }
}