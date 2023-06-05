"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import "../../styles/global.css";
import authMiddleware from "@app/middleware";

const baseUrl = "http://localhost:3000";

const TypePage = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  let name = useRef();

  const handleCreateNew = () => {
    setShowForm(true);
    setSelectedType(null);
    name = "";
  };

  const handleEdit = (type) => {
    setShowForm(true);
    setSelectedType(type);
    name = type.name;
  };

  const handleDelete = (entity) => {
    Swal.fire({
      title: `Do you want to delete ${entity.name}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Delete",
      denyButtonText: `Nope`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${baseUrl}/admins/deletetype/${entity.id}`,
            {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          );
          Swal.fire({
            width: 200,
            icon: "success",
            text: `${entity.name} has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTypes(types.filter((type) => type.id !== entity.id));
        } catch (err) {
          console.log(err);
          const error = err.response.data.message;

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Nothings deleted", "", "info");
      }
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedType) {
        const { data } = await axios.put(
          `${baseUrl}/admins/edittype/${selectedType.id}`,
          { name: name.current.value },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        Swal.fire({
          width: 200,
          icon: "success",
          text: `Type ${name.current.value} updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const { data } = await axios.post(
          `${baseUrl}/admins/addtype`,
          { name: name.current.value },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Types added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      name = "";
      setShowForm(false);
    }
  };

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/admins/type`);
        setTypes(data.rows);
      } catch (err) {
        console.log(err);
        const error = err.response.data.error;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchTypes();
  }, [showForm]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Types</h1>
      <div className="flex justify-between mb-4">
        {!showForm ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleCreateNew}
          >
            Create New
          </button>
        ) : null}
      </div>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              ref={name}
              defaultValue={selectedType ? selectedType.name : ""}
              className="border border-gray-300 rounded py-2 px-4 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {selectedType ? "Update" : "Submit"}
          </button>
        </form>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td className="py-2 px-4 border-b">{type.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(type)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(type)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default authMiddleware(TypePage);
