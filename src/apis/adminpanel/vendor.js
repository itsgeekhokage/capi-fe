const fetchAllVendors = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/vendor/get/all`
        );
        if (!response.ok) {
            throw new Error("vendors nhi aa rahe bhai");
        }
        const data = await response.json();
        return (data.data);
    } catch (error) {
        console.log(error);
    }
}

const createVendor = async (name) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/vendor/create/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error("response was not ok");
        }
    } catch (error) {
        alert("save nhi hua")
        console.log(error);
    }
}

export {fetchAllVendors, createVendor};