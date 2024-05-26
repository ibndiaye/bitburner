/** @param {NS} ns */
export async function main(ns) {
    getServers(ns);
  }
  /** @param {NS} ns */
  export function getServers(ns) {
    let fileName = "servers.txt";
    let servers = ns.scan("home");
  
    if (ns.fileExists(fileName)) {
      ns.clear(fileName)
    }
  
    ns.write(fileName, "host;max ram; security lvl; money available; ports required; hacking lvl; root\n")
    for (let i = 0; i < servers.length; i++) {
      let host = servers[i];
      ns.write(fileName, `${host};${ns.formatRam(ns.getServerMaxRam(host))};${ns.getServerSecurityLevel(host)}\
  ;${ns.formatNumber(ns.getServerMoneyAvailable(host))};${ns.getServerNumPortsRequired(host)}\
  ;${ns.getServerRequiredHackingLevel(host)}; ${ns.hasRootAccess(host)}\n`);
      ns.print(host + " has been logged.");
  
      let nextServers = ns.scan(host);
      for (let j = 0; j < nextServers.length; j++) {
        if (!servers.includes(nextServers[j])) {
          servers.push(nextServers[j]);
        }
      }
    }
    ns.tprint("Network scanned, " + servers.length + " added.")
    return servers;
  }