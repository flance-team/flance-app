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
               const { data } = await axios.delete(`${baseUrl}/admins/deletecategory/${entity.id}`, {
                  headers: {
                     access_token: localStorage.getItem("access_token"),
                  },
               });
               Swal.fire({
                  width: 200,
                  icon: "success",
                  text: `${entity.name} has been deleted.`,
                  showConfirmButton: false,
                  timer: 1500,
               });
               setCategories(categories.filter((category) => category.id !== entity.id));
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
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded"
                  onClick={handleCreateNew}>
                  <svg
                     class="h-4 w-4 text-white mr-1"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                     />
                  </svg>
                  Create New
               </button>
            ) : null}
         </div>
         {showForm ? (
            <form onSubmit={handleFormSubmit}>
               <div className="mb-4">
                  <label
                     htmlFor="name"
                     className="block font-medium mb-2">
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
                     <label
                        htmlFor="name"
                        className="block font-medium mb-2">
                        Related Skills
                     </label>
                     <BadgeInput onBadgesChange={handleBadgesChange} />
                  </div>
               )}
               <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  {selectedCategory ? "Update" : "Submit"}
               </button>
            </form>
         ) : (
            <div class="rounded-xl overflow-hidden">
               <table className="w-full border border-gray-200">
                  <thead className="bg-gray-900 text-gray-200">
                     <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Related Skills</th>
                        <th className="py-2 px-4 border-b">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {categories.map((category, index) => (
                        <tr
                           key={category.id}
                           className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}>
                           <td className="py-2 px-4 border-b">{category.name}</td>
                           <td className="py-2 px-4 border-b">
                              {category.SkillCategories.map((skill) => {
                                 return `${skill.Skill.name} `;
                              })}
                           </td>
                           <td className="flex justify-center py-2 px-4 border-b">
                              <button
                                 className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-5 rounded mr-2"
                                 onClick={() => handleEdit(category)}>
                                 <svg
                                    class="h-4 w-4 text-white mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                       stroke-linecap="round"
                                       stroke-linejoin="round"
                                       stroke-width="2"
                                       d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                 </svg>
                                 Edit
                              </button>
                              <button
                                 className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                 onClick={() => handleDelete(category)}>
                                 <svg
                                    class="h-4 w-4 text-white mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                       stroke-linecap="round"
                                       stroke-linejoin="round"
                                       stroke-width="2"
                                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                 </svg>
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default authMiddleware(CategoryPage);
