import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { Form, Loader } from "../components";
import { getRandomPrompt } from "../utils";
const Post = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photoUrl: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("https://dall-e-clone-nine.vercel.app/api/v1/dallE", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setForm({ ...form, photoUrl: data.photoUrl });
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photoUrl) {
      setLoading(true);
      try {
        const response = await fetch("https://dall-e-clone-nine.vercel.app/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            photo: form.photoUrl,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          navigate("/");
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image")
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create your image
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate your images through OpenAI's DALL-E AI and share them with
          the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Form
            labelName="Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <Form
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="teddy bears shopping for groceries in Japan, ukiyo-e"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>
        <div className="w-full h-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-5 p-3 flex justify-center items-center">
          {form.photoUrl ? (
            <img
              src={form.photoUrl}
              alt="generated image"
              className="object-contain"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="object-contain opacity-40"
            />
          )}
          {generatingImg && (
            <div className="w-full h-full absolute flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="text-[#666e75] text-[14px]">
            You can share your newly generated image with the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Post;
