// import { useState } from "react";
import Image from "next/image";

const LoginForm = () => {
  //   const [formValue, setFormValue] = useState({
  //     email: "",
  //     password: "",
  //   });
  //   const inputForm = (el) => {
  //     setFormValue({
  //       ...formValue,
  //       [el.target.name]: el.target.value,
  //     });
  //   };
  //   const formOnSubmit = (el) => {
  //     el.preventDefault();
  //     console.log(formValue, "dariFormInputJSX line 14");
  //     const response = JSON.stringify(formValue);
  //   };
  return (
    <>
      {/* <div className="flex bg-white">
        <div className="flex-shrink-0">
          <img
            src="/LoginPicUser.jpg"
            className="max-h-full w-200"
            alt="User Image"
          />
        </div>
        <div className="ml-4">Place your content here</div>
      </div> */}
      <div className="drawer-side bg-white">
        <label for="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content bg-white">
          <img src="/LoginPicUser.jpg" className="h-full" alt="User Image" />
        </ul>
      </div>
    </>
  );
};
export default LoginForm;
