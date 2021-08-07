import React from "react";

const MessagesArea = ({ lines, myName }) => {
  const isNextSameFrom = idx => {
    if (idx === lines.length - 1) return false;
    return lines[idx].from === lines[idx + 1].from;
  };

  const formatDate = date => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-grow flex flex-col px-4 py-3 md:overflow-x-hidden overflow-auto">
      {lines ? (
        lines.map((m, idx) => (
          <div
            key={idx}
            className={`flex max-w-full md:max-w-3/4 lg:max-w-1/2 break-all ${
              m.from === myName
                ? "self-end items-end flex-row-reverse"
                : "self-start items-start"
            } ${isNextSameFrom(idx) ? "mb-1" : "mb-3"}`}
          >
            <div
              className={`message py-2 px-3 rounded-xl shadow-xl mb-1 bg-gradient-to-r ${
                m.from === myName
                  ? "rounded-br-none from-orange-300 to-yellow-500 text-white"
                  : "rounded-bl-none from-orange-200 to-yellow-200"
              }`}
            >
              {m.message}
              <span
                className={`text-xs mx-2 whitespace-nowrap ${
                  m.from === myName ? "text-white" : "text-black"
                }`}
              >
                {formatDate(m.on)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>"No messages yet"</span>
      )}
    </div>
  );
};

export default MessagesArea;
