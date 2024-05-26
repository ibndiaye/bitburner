
/** @param {NS} ns */
export async function main(ns) {
  await hackTarget(ns, ns.args[0]);
}


export async function hackTarget(ns, target) {
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