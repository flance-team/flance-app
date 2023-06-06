"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import "../../styles/global.css";
import authMiddleware from "@app/middleware";

const baseUrl = "http://localhost:3000";

const SkillPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  let name = useRef();

  const handleCreateNew = () => {
    setShowForm(true);
    setSelectedSkill(null);
    name = "";
  };

  const handleEdit = (skill) => {
    setShowForm(true);
    setSelectedSkill(skill);
    name = skill.name;
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
            `${baseUrl}/admins/deleteskill/${entity.id}`,
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
          setSkills(skills.filter((skill) => skill.id !== entity.id));
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
      if (selectedSkill) {
        const { data } = await axios.put(
          `${baseUrl}/admins/editskill/${selectedSkill.id}`,
          { name: name.current.value },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        Swal.fire({
          width: 200,
          icon: "success",
          text: `Skill ${name.current.value} updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const { data } = await axios.post(
          `${baseUrl}/admins/addskill`,
          { name: name.current.value },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Skills added successfully`,
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
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/admins/skill`);
        setSkills(data.rows);
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

    fetchSkills();
  }, [showForm]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Skills</h1>
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
              defaultValue={selectedSkill ? selectedSkill.name : ""}
              className="border border-gray-300 rounded py-2 px-4 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {selectedSkill ? "Update" : "Submit"}
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
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td className="py-2 px-4 border-b">{skill.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(skill)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(skill)}
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

export default authMiddleware(SkillPage);
