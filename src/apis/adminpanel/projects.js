const fetchSingleProject = async (projectId) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/projects/get/${projectId}`
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

const fetchProjects = async () => {
    console.log("here")
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/projects/get/all`
        );
        if (!response.ok) {
            alert("Internal server error");
            throw new Error("Response was not okay");
        }
        const data = await response.json();
        return (data.data);
    } catch (error) {
        console.log(error);
        return [];
    }
};

const submitProject = async (data) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/projects/create/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        const responseData = await response.json();

        return (responseData.message);
        if (!response.ok) {
            alert("Internal server error");
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.log(error);
    }
}




export {fetchProjects, submitProject, fetchSingleProject };