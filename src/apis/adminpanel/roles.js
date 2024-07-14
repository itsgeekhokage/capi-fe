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

export {fetchAllRoles};