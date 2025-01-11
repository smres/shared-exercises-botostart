import { toast, Zoom } from "react-toastify";

const notify = (type, text) =>
  toast[type](text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });

export { notify };
