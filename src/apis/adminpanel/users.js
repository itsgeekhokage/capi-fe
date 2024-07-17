
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
        console.log(data.data)
    } catch (error) {
        console.log(error);
    }
}

const createAgentsByExcel = async () => {
    
}

export {fetchAllAgents};