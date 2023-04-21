import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "Male",
    email: "",
    phone: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const { firstname, middlename, lastname, gender, email, phone, address } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    axios
      .post("/api/users", formData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        errors.map((error) => {
          setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [error.path]: [error.msg],
          }));
        });
      });
  };

  return (
    <>
      <Link
        to="/"
        className="rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold shadow-sm float-right"
      >
        Go Back
      </Link>
      <h1 className="pb-10 text-xl font-bold">ADD USER</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => onChange(e)}
                    className={`block w-full rounded-md ${
                      formErrors.firstname
                        ? "border-1 border-red-500"
                        : "border-0"
                    } py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {formErrors.firstname && (
                    <p className="text-red-500">{formErrors.firstname}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Middle Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="middlename"
                    value={middlename}
                    onChange={(e) => onChange(e)}
                    className={`block w-full rounded-md ${
                      formErrors.middlename
                        ? "border-1 border-red-500"
                        : "border-0"
                    } py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {formErrors.middlename && (
                    <p className="text-red-500">{formErrors.middlename}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => onChange(e)}
                    className={`block w-full rounded-md ${
                      formErrors.lastname
                        ? "border-1 border-red-500"
                        : "border-0"
                    } py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {formErrors.lastname && (
                    <p className="text-red-500">{formErrors.lastname}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => onChange(e)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className={`block w-full rounded-md ${
                      formErrors.email ? "border-1 border-red-500" : "border-0"
                    } py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => onChange(e)}
                    className={`block w-full rounded-md ${
                      formErrors.phone ? "border-1 border-red-500" : "border-0"
                    } py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    name="address"
                    value={address}
                    onChange={(e) => onChange(e)}
                    className={`block w-full rounded-md ${
                      formErrors.address
                        ? "border-1 border-red-500"
                        : "border-0"
                    } py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  ></textarea>
                  {formErrors.address && (
                    <p className="text-red-500">{formErrors.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            to="/"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddUser;
