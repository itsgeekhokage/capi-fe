const fetchAllRoles = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST_API}/roles/get/all`);
        if (!response.ok) {
            throw new Error("skdljflsd");
        }
        const data = await response.json();
        return (data.data);
    } catch (error) {
        console.log(error);
    }
}

const createRole = async (data) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/roles/create/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            alert("Internal server error");
            throw new Error("Internal server error");
        }

        const responseData = await response.json();

        return (responseData.message);

    } catch (error) {
        console.log(error);
    }
}

const updateRoles = async (roleId, data) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/roles/update/${roleId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            alert("Internal server error");
            throw new Error("Internal server error");
        }

        const responseData = await response.json();

        console.log(responseData.message);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export {fetchAllRoles, createRole, updateRoles};