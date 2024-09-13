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
        console.log("User not found");
    }
}


async function createUser(email, username, firstname, lastname, password) {
    try {
        let teszt = await getUserByEmail(email);
        if (teszt) {
            console.log("User already exists");
        } else {
            const response = await fetch("https://panel.hexaverse.hu/api/application/users", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    first_name: firstname,
                    last_name: lastname,
                    password: password,
                }),
            });
    
            const data = await response.json();
            console.log(data);
        }
    } catch (err) {
        console.error(err);
    }
}

// Call the function to create the server

module.exports = {
    createUser
};