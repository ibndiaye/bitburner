/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    const servers = getServers(ns);
  
    if (ns.getHostname() === "home") {
      getServers(ns);
      // gainRoot(ns, servers);
    }
    ns.tprint(servers)
    hackTarget();
  }
  
  function deploy(ns, servers) {
    for (const s of servers) {
      ns.scp("hack.js", s);
      ns.exec()
    }
  }
  
  function gainRoot(ns, servers) {
    servers.map(x => !ns.hasRootAccess(x)).map(x => ns.nuke(x));
  }
  
  function getServers(ns) {
    let homeServers = ns.scan("home");
    let newServers;
    for (const hs of homeServers) {
      ns.scan(hs);
      newServers.push(tmpServers);
    }
    return [...new Set(newServers)];
  }
  
  async function hackTarget(ns, target) {
    const maxMoney = ns.getServerMaxMoney(target);
    const minSec = ns.getServerMinSecurityLevel(target);
    while (true) {
      if (minSec + .5 < ns.getServerSecurityLevel(target)) {
        await ns.weaken(target);
        ns.print(`${target} has been weakened`);
      } else if (ns.getServerMoneyAvailable(target) < 0.95 * maxMoney) {
        await ns.grow(target);
        ns.print(`${target} has been grown`);
      } else {
        await ns.hack(target);
        ns.print(`${target} has been hacked`);
      }
    }
  }