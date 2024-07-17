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

const createControls = async (formData) => {
    formData.updated_by = "1";

    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/controls/create/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        if (!response.ok) {
            alert("Internal server error");
            throw new Error("Internal server error");
        }

        const responseData = await response.json();
        return(responseData);
    } catch (error) {
        console.log(error);
    }
};

const updateControls = async (id, data) => {

    try {
        const apiUrl = `${import.meta.env.VITE_HOST_API}/controls/update/${id}`;

        if (!import.meta.env.VITE_HOST_API) {
            console.error("Environment variable VITE_HOST_API is not defined");
            return;
        }

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            alert("Internal server error");
            throw new Error("Response was not ok");
        }

        const responseData = await response.json();
        return responseData.message;
    } catch (error) {
        console.log("Error:", error);
        return ("failed to update");
    }
}

const deleteControls = async (id) => {


    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST_API}/controls/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            alert("Internal server error");
            throw new Error("Response was not ok");
        }
        const responseData = await response.json();
        return(responseData.message);


    } catch (error) {
        console.log(error);
    }
}

export {fetchAllControls, createControls, updateControls, deleteControls};