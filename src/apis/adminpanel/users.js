
const fetchAllAgents = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/user/get/all`
        );
        if (!response.ok) {
            alert("internal server error");
            throw new Error("reponse was not okk");
        }
        const data = await response.json();
        return(data.data)
    } catch (error) {
        console.log(error);
    }
}

const createAgentsExcel = async (payload) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/user/create/excel`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();
        alert(result.message);

        if (!response.ok) {
            throw new Error("Response was not OK");
        }
    } catch (error) {
        console.log(error);
    }
}

const createAgentManual = async (payload) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/user/create/manual`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();
        alert(result.message);

        if (!response.ok) {
            throw new Error("response was not ok");
        }
    } catch (error) {
        console.log(error);
    }
}
export {fetchAllAgents, createAgentsExcel, createAgentManual};