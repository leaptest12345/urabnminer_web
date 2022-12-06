import emailjs from "@emailjs/browser";
import Button from "../components/Button";

export const ContactUs = () => {
  const sendMail = () => {
    emailjs
      .send(
        "service_z93sr7b",
        "template_1l3dozu",
        {
          reply_to: "sutharbipinn25899@gmail.com",
          to_name: "bipin",
          invoice1: "invoice1",
          invoice2: "invoice2",
          message: "new messages",
        },
        "YGORpuIPdDcdUY4_s"
      )
      .then((value) => console.log(value))
      .catch((error) => console.log(error));
  };
  return <Button onClick={() => sendMail()} title={"sendMail"} />;
};
