/** @format */

const fetchQuestionTags = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_HOST_API}/questiontags/get/all`
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
};

const createQuestionTag = async (payload) => {
  console.log("here");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_HOST_API}/questiontags/create/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      alert("Internal server error");
      throw new Error("Internal server error");
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData.message;
  } catch (error) {
    console.log(error);
  }
};

const editQuestionTag = async (id, payload) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_HOST_API}/questiontags/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      alert("Internal server error");
      throw new Error("Internal server error");
    }

    const responseData = await response.json();
    console.log(responseData)
    return responseData.message;
  } catch (error) {
    console.log(error);
  }
};

export { fetchQuestionTags, createQuestionTag,  editQuestionTag};
