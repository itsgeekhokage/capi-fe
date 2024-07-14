const fetchAllControls = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/controls/get/all`
        );
        if (!response.ok) {
            alert("internal server error");
            throw new Error("reponse was not okk");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const updateControls = async () => {

}

export {fetchAllControls};