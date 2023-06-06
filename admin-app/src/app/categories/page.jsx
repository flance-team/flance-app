"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import "../../styles/global.css";
import BadgeInput from "../../components/BadgeInput";
import authMiddleware from "@app/middleware";

const baseUrl = "http://localhost:3000";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [parentBadges, setParentBadges] = useState([]);
  let name = useRef();

  const handleBadgesChange = (badges) => {
    setParentBadges(badges);
  };

  const handleCreateNew = () => {
    setShowForm(true);
    setSelectedCategory(null);
    name = "";
  };

  const handleEdit = (category) => {
    setShowForm(true);
    setSelectedCategory(category);
    name = category.name;
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
            `${baseUrl}/admins/deletecategory/${entity.id}`,
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
          setCategories(
            categories.filter((category) => category.id !== entity.id)
          );
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
      if (selectedCategory) {
        const { data } = await axios.put(
          `${baseUrl}/admins/editcategory/${selectedCategory.id}`,
          { name: name.current.value },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        Swal.fire({
          width: 200,
          icon: "success",
          text: `Category ${name.current.value} updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const { data } = await axios.post(
          `${baseUrl}/admins/addcategory`,
          { name: name.current.value, skills: parentBadges },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Categories added successfully`,
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
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/admins/category`);
        setCategories(data.rows);
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

    fetchCategories();
  }, [showForm]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
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
              defaultValue={selectedCategory ? selectedCategory.name : ""}
              className="border border-gray-300 rounded py-2 px-4 w-full"
            />
          </div>
          {selectedCategory ? (
            <></>
          ) : (
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Related Skills
              </label>
              <BadgeInput onBadgesChange={handleBadgesChange} />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {selectedCategory ? "Update" : "Submit"}
          </button>
        </form>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Related Skills</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">
                  {category.SkillCategories.map((skill) => {
                    return `${skill.Skill.name} `;
                  })}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(category)}
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

export default authMiddleware(CategoryPage);
