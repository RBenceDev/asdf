const { mcDockerIMG, mcStartup } = require('../../../settings/settings');
const { createServer } = require('../NodeJs');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

async function getUserByEmailGetUserId(email) {
    try {
        const user = await getUserByEmail(email);
        return parseInt(user?.attributes?.id, 10);
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function createServerBungee() {
    try {
        const userId = await getUserByEmailGetUserId("gmpbence@gmail.com");
        if (!userId) {
            throw new Error("User ID is undefined");
        }

        const response = await fetch("https://panel.hexaverse.hu/api/application/servers", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({
                name: "asd",
                user: userId,
                egg: 2,
                docker_image: `${mcDockerIMG}`,
                startup: `${mcStartup}`,
                environment: {
                    BUNGEE_VERSION: "latest",
                    SERVER_JARFILE: "server.jar",
                },
                limits: {
                    memory: 1024,
                    swap: 0,
                    disk: 2048,
                    io: 500,
                    cpu: 100,
                },
                feature_limits: {
                    databases: 5,
                    backups: 1,
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

// Call the function to create the server
createServer();

module.exports = {
    createServerBungee
};