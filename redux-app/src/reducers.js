const initialState = {
    categories: [],
    forms: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_CATEGORY":
        return {
          ...state,
          categories: [...state.categories, action.payload]
        };
  
      case "CREATE_FORM":
        return {
          ...state,
          forms: [...state.forms, action.payload]
        };
  
      case "EDIT_FORM":
        return {
          ...state,
          forms: state.forms.map((form) =>
            form.id === action.payload.id ? action.payload : form
          )
        };
  
      case "CHANGE_FORM_CATEGORY":
        return {
          ...state,
          forms: state.forms.map((form) =>
            form.id === action.payload.formId
              ? { ...form, categoryId: action.payload.categoryId }
              : form
          )
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  