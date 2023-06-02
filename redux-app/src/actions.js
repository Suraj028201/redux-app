export const createCategory = (category) => {
    return {
      type: "CREATE_CATEGORY",
      payload: category
    };
  };
  
  export const createForm = (form) => {
    return {
      type: "CREATE_FORM",
      payload: form
    };
  };
  
  export const editForm = (form) => {
    return {
      type: "EDIT_FORM",
      payload: form
    };
  };
  
  export const changeFormCategory = (formId, categoryId) => {
    return {
      type: "CHANGE_FORM_CATEGORY",
      payload: {
        formId,
        categoryId
      }
    };
  };
  