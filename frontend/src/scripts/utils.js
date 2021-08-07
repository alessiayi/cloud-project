const stringToColor = (str, s = 70, l = 70) => {
  if (!str) str = "";
  // Source: https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
};

export const stringToGradient = str => {
  return `linear-gradient(to right, ${stringToColor(str)}, ${stringToColor(
    str,
    80,
    60
  )})`;
};

export const validateForm = data => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let err = {};
  let valid = true;
  Object.keys(data).forEach(field => {
    err[field] = "";
    if (!data[field]) {
      err[field] = "Hey! You left this empty";
      valid = false;
    } else err[field] = "";
  });
  if (data.email && !emailRegex.test(data.email)) {
    err["email"] = "This is not an email";
    valid = false;
  }

  if (data["passwordAgain"])
    if (data["passwordAgain"] !== data["password"]) {
      err["passwordAgain"] = "This is not the same password...";
      valid = false;
    }

  return [valid, err];
};

export const arrayBufferToBase64 = buffer => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const base64ToArrayBuffer = base64 => {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};
