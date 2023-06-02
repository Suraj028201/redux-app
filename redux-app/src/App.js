import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  createForm,
  editForm,
  changeFormCategory
} from "./actions";
import './App.css';
import { isEmailValid, isValidMobileNumber } from "./utils";

const App = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formUID, setFormUID] = useState("");
  const [formPhoneNumber, setFormPhoneNumber] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editFormValue, setEditFromValue] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const forms = useSelector((state) =>
    state.forms.filter((form) =>
      filterCategory ? form.categoryId === filterCategory : true
    )
  );

  const handleCreateCategory = () => {
    const category = {
      id: categories.length + 1,
      name: categoryName,
      description: categoryDescription
    };
    dispatch(createCategory(category));
    setCategoryName("");
    setCategoryDescription("");
  };

  const handleCreateForm = () => {
    const form = {
      id: forms.length + 1,
      name: formName,
      email: formEmail,
      uid: formUID,
      phoneNumber: formPhoneNumber,
      description: formDescription,
      categoryId: selectedCategoryId
    };
    dispatch(createForm(form));
    setFormName("");
    setFormEmail("");
    setFormUID("");
    setFormPhoneNumber("");
    setFormDescription("");
    setSelectedCategoryId("");
  };

  const handleEditForm = (form) => {
    // Open the form for editing with pre-filled data
    setEditFromValue(true);
    setFormName(form.name);
    setFormEmail(form.email);
    setFormUID(form.uid);
    setFormPhoneNumber(form.phoneNumber);
    setFormDescription(form.description);
    setSelectedCategoryId(form.categoryId);
  };

  const handleSaveEditedForm = (form) => {
    setEditFromValue(false);
    const editedForm = { ...form };
    editedForm.name = formName;
    editedForm.email = formEmail;
    editedForm.uid = formUID;
    editedForm.phoneNumber = formPhoneNumber;
    editedForm.description = formDescription;
    dispatch(editForm(editedForm));
    // Clear the form after saving
    setFormName("");
    setFormEmail("");
    setFormUID("");
    setFormPhoneNumber("");
    setFormDescription("");
    setSelectedCategoryId("");
  };

  const handleChangeFormCategory = (formId, categoryId) => {
    console.log("froiD: ", formId, categoryId);
    // const categoryId = prompt("Enter the new category ID for the form:");
    dispatch(changeFormCategory(formId, categoryId));
  };

  const handleFilterCategory = (categoryId) => {
    setFilterCategory(categoryId);
  };

  const validateEmail = (email) => {
   setEmailCheck(isEmailValid(email));
  }

  const validateNumber = (number) => {
   setNumberCheck(isValidMobileNumber(number));
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} - {category.description}
          </li>
        ))}
      </ul>
      <h2>Forms</h2>
      <div className="filter-section">
        <label>Filter by Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => handleFilterCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            {form.name} - {form.email} - {form.uid} - {form.phoneNumber} -{" "}
            {form.description}
            <button onClick={() => handleEditForm(form)}>Edit</button>
            <select
              value={form.categoryId}
              onChange={(e) =>
                handleChangeFormCategory(form.id, e.target.value)
              }
            >
              <option value="">Change Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      <div className="create-category">
      <h2>Create Category</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
        <button onClick={handleCreateCategory}>Create</button>
      </div></div>
      <h2>Create Form</h2>
      {editFormValue? <></>:
      <div className="create-category">
        <label>Name:</label>
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={formEmail}
          onInput={(e)=>validateEmail(e.target.value)}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label>UID:</label>
        <input
          type="text"
          value={formUID}
          onChange={(e) => setFormUID(e.target.value)}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          value={formPhoneNumber}
          onInput={(e)=>validateNumber(e.target.value)}
          onChange={(e) => setFormPhoneNumber(e.target.value)}
          maxLength={10}
        />
        <label>Description:</label>
        <input
          type="text"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {formName &&
        formEmail &&
        formUID &&
        formPhoneNumber &&
        emailCheck &&
        numberCheck &&
        formDescription ? (
          <button onClick={handleCreateForm}>Create</button>
        ) : (
          <p>All fields are mandatory.</p>
        )}
      </div>}
      {formName &&
        formEmail &&
        formUID &&
        formPhoneNumber &&
        formDescription &&
        editFormValue && (
          <div>
            <h2>Edit Form</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="text"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              <label>UID:</label>
              <input
                type="text"
                value={formUID}
                onChange={(e) => setFormUID(e.target.value)}
              />
              <label>Phone Number:</label>
              <input
                type="text"
                value={formPhoneNumber}
                onChange={(e) => setFormPhoneNumber(e.target.value)}
              />
              <label>Description:</label>
              <input
                type="text"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
              <label>Category:</label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button onClick={(form) => handleSaveEditedForm(form)}>
                Save
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
