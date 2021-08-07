import React, { useState } from "react";
import API from "../api/api";

const NewChatForm = ({ onChatCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [error, setError] = useState("");

  const createChat = async () => {
    try {
      const { chatItem, chat } = (
        await API.post(
          "/chats",
          { toEmail: toEmail },
          { withCredentials: true }
        )
      ).data;

      onChatCreated(chatItem, chat);
    } catch (e) {
      if (e.response && e.response.status === 400)
        setError(e.response.data["error"]);
      else throw e;
    }
  };

  return (
    <div className="mb-3">
      {showForm ? (
        <div className="bg-white shadow rounded-xl p-2 pl-4 fade-transition">
          <h4 className="mt-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 font-bold mb-3">
            Create new chat
          </h4>
          {error && <span className="text-sm block text-red-500">{error}</span>}
          <label htmlFor="email">User email</label>
          <input
            className="shadow p-2 rounded-lg ml-4 mt-1 inline font-light focus:outline-none"
            type="email"
            placeholder="Some user"
            onChange={e => setToEmail(e.target.value)}
          />

          <div className="flex justify-center mt-3">
            <button
              onClick={() => setShowForm(false)}
              className="mr-5 hover:bg-gray-200 transition-colors rounded-3xl px-5 py-1 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={() => createChat()}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-3xl px-5 py-1 focus:outline-none"
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="fade-transition flex justify-center mt-1 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-3xl px-5 py-2 focus:outline-none"
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              d="M17.657,2.982H2.342c-0.234,0-0.425,0.191-0.425,0.426v10.21c0,0.234,0.191,0.426,0.425,0.426h3.404v2.553c0,0.397,0.48,0.547,0.725,0.302l2.889-2.854h8.298c0.234,0,0.426-0.191,0.426-0.426V3.408C18.083,3.174,17.892,2.982,17.657,2.982M17.232,13.192H9.185c-0.113,0-0.219,0.045-0.3,0.124l-2.289,2.262v-1.96c0-0.233-0.191-0.426-0.425-0.426H2.767V3.833h14.465V13.192z M10,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.488-0.668,1.488-1.489C11.488,7.905,10.821,7.237,10,7.237 M10,9.364c-0.352,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C10.638,9.077,10.351,9.364,10,9.364 M14.254,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489s1.489-0.668,1.489-1.489C15.743,7.905,15.075,7.237,14.254,7.237 M14.254,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.352,0,0.639,0.287,0.639,0.638C14.893,9.077,14.605,9.364,14.254,9.364 M5.746,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.489-0.668,1.489-1.489C7.234,7.905,6.566,7.237,5.746,7.237 M5.746,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C6.384,9.077,6.096,9.364,5.746,9.364"
            ></path>
          </svg>
          Create new chat
        </button>
      )}
    </div>
  );
};

export default NewChatForm;
