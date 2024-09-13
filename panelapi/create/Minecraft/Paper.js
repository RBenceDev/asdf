const { mcDockerIMG, mcStartup } = require('../../../settings/settings');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiToken = "ptla_mE65PmfT3eqdwHARGPT0Vds7Z5tvTiagAvY5tALGeQX";

async function getAllUsers() {
    let users = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
        const response = await fetch(`https://panel.hexaverse.hu/api/application/users?page=${page}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiToken}`,
            },
        });
        const data = await response.json();
        
        if (data?.meta?.pagination) {
            totalPages = data.meta.pagination.total_pages;
        }

        if (data?.data) {
            users = users.concat(data.data);
        }

        page++;
    }

    return users;
}

async function getUserByEmail(email) {
    const users = await getAllUsers();
    const user = users.find((user) => user?.attributes?.email === email);
    if (user) {
        return user;
    } else {
        throw new Error("User not found");
    }
}

async function getUserByEmailGetUserIdPaper(email) {
    try {
        const user = await getUserByEmail(email);
        return parseInt(user?.attributes?.id, 10);
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function createServerPaper(serverName, userEmail, memory, disk, cpu, db, backup, version) {
    try {
        const userId = await getUserByEmailGetUserIdPaper(userEmail);
        if (!userId) {
            console.log(userEmail);
            console.log("User ID is undefined");
        }

        const response = await fetch("https://panel.hexaverse.hu/api/application/servers", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({
                name: serverName,
                user: userId,
                egg: 5,
                docker_image: `${mcDockerIMG}`,
                startup: `${mcStartup}`,
                environment: {
                    MINECRAFT_VERSION: version,
                    SERVER_JARFILE: "server.jar",
                    BUILD_NUMBER: "latest",
                },
                limits: {
                    memory: memory,
                    swap: 0,
                    disk: disk,
                    io: 500,
                    cpu: cpu,
                },
                feature_limits: {
                    databases: db,
                    backups: backup,
                },
                deploy: {
                    locations: [1], 
                    dedicated_ip: false,
                    port_range: [],
                },
            }),
        });

        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getUserByEmailGetUserIdPaper,
    createServerPaper
};