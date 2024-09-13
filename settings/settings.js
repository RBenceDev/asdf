const mcStartup = "java --add-modules=jdk.incubator.vector -XX:MaxRAMPercentage=95.0 -Dfile.encoding=UTF-8 -Xms128M -XX:+PerfDisableSharedMem -XX:+ParallelRefProcEnabled -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:-OmitStackTraceInFastThrow -XX:+AlwaysPreTouch -XX:MaxGCPauseMillis=100 -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=true -Daikars.new.flags=true -jar {{SERVER_JARFILE}}"
const nodeJsStartup = 'if [[ -d .git ]] && [[ 0 == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; if [[ "${MAIN_FILE}" == "*.js" ]]; then /usr/local/bin/node "/home/container/${MAIN_FILE}" ${NODE_ARGS}; else /usr/local/bin/ts-node --esm "/home/container/${MAIN_FILE}" ${NODE_ARGS}; fi';
const mcDockerIMG = "ghcr.io/pterodactyl/yolks:java_21";
const dcDockerIMG = "ghcr.io/parkervcp/yolks:nodejs_21";



const stripeSuccesUrl = "";
const stripeCancelUrl = "";

module.exports = {
    mcStartup,
    nodeJsStartup,
    mcDockerIMG,
    dcDockerIMG,
    stripeSuccesUrl,
    stripeCancelUrl
}