import toast from "react-hot-toast";

export const toastAlert = (type, message) => {
  const toastTheme = {
    style: {
      padding: "16px",
      color: "black",
      //   backgroundColor: type == 0 ? "#ffcccb" : "lightgreen",
      backgroundColor: "#FFFAEE",
      fontWeight: "600",
      fontSize: "1rem",
    },
    iconTheme: {
      secondary: "#FFFAEE",
    },
    duration: 2000,
  };
  switch (type) {
    case 1:
      toast.success(message, toastTheme);
      break;
    case 0:
      toast.error(message, toastTheme);
      break;
    default:
      break;
  }
};
