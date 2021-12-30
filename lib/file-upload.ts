import ky from "ky";

export const fileUpload = (file) => {
  const url = "http://example.com/file-upload";
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return ky.post(url, { body: formData, ...config });
};
