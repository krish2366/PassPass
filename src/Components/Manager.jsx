import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const notify = (text) => toast(text);

  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordType, setPasswordType] = useState("password");
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    const req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const toggleVisibility = () => {
    // alert("you clicked");
    if (ref.current.src.includes("images/eyecross.png")) {
      ref.current.src = "images/eye.png";
      setPasswordType("password");
    } else {
      ref.current.src = "images/eyecross.png";
      setPasswordType("text");
    }
  };

  // const savePassword = async () => {
  //   if (
  //     form.password.length > 3 &&
  //     form.site.length > 3 &&
  //     form.username.length > 3
  //   ) {
  //     //if id is present then delete it first
  //     console.log(form.id)
  //     await fetch("http://localhost:3000/", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id: form.id }),
  //     });
  //     console.log(form.id)
  //     setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
  //     // saving a new password
  //     await fetch("http://localhost:3000/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ...form, id: uuidv4() }),
  //     });
  //     console.log(form.id)
  //     setform({ site: "", username: "", password: "" });
  //     notify("Password Saved!!");
  //   } else {
  //     notify("Something went wrong !!!!");
  //   }
  // };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // If any such id exists in the db, delete it
      if (form.id) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      // saving a password
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      
      setform({ site: "", username: "", password: "" });
      toast("Password saved!");
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = async (id) => {
    setPasswordArray(passwordArray.filter((pass) => pass.id !== id));
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ id }),
    });
    notify(`Password Deleted!!`);
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="mx-auto text-white max-w-4xl p-10 pb-3">
        <h1 className="text-3xl font-bold text-center ">
          <span className="text-green-400">&lt;</span>Pass
          <span className="text-green-400">Pass/&gt;</span>
        </h1>
        <p className="text-center text-green-200">Your password manager </p>
        <div className="flex flex-col p-4 ">
          <input
            placeholder="Enter Website URL"
            className="rounded-full border-2 border-green-500 text-black stroke-none p-4 py-1"
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
          />
          <div className="flex mt-5 gap-6">
            <input
              placeholder="Enter Username"
              className="rounded-full border-2 border-green-500 text-black stroke-none p-4 py-1 w-full"
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
            />
            <div className="w-full relative">
              <input
                placeholder="Enter Password"
                className="rounded-full border-2 border-green-500 text-black stroke-none p-4 py-1 w-full "
                type={passwordType}
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="right-10 top-[0.35rem] absolute cursor-pointer"
                onClick={toggleVisibility}
              >
                <img ref={ref} src="images/eye.png" alt="" width={25} />
              </span>
            </div>
          </div>
          <button
            className="mt-5 bg-green-300 rounded-full flex justify-center items-center w-44 self-center font-bold text-[#525B76]"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>

      <div className="px-[10%]">
        <h2 className="font-bold text-white text-center mb-3">
          Your Passwords
        </h2>

        {passwordArray.length === 0 && (
          <div className="font-bold text-white">No Password to Show...</div>
        )}

        {passwordArray.length !== 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 ">
              <tr className="table w-full table-fixed">
                <th className="py-1">URL</th>
                <th className="py-1">USERNAME</th>
                <th className="py-1">PASSWORD</th>
                <th className="py-1">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-green-200 block overflow-y-auto max-h-40">
              {passwordArray.map((set, index) => {
                return (
                  <tr key={index} className="table w-full table-fixed">
                    <td className="py-2 border border-white text-center w-20">
                      <a href={set.site}>{set.site}</a>
                    </td>
                    <td className="py-2 border border-white text-center w-20">
                      {set.username}
                    </td>
                    <td className="py-2 border border-white text-center w-20">
                      {set.password}
                    </td>
                    <td className="py-2 border border-white text-center w-20">
                      <span
                        className="mx-2"
                        onClick={() => {
                          deletePassword(set.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        onClick={() => {
                          editPassword(set.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
