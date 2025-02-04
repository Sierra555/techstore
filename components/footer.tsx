import { APP_NAME } from "@/lib/constansts";

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t shadow-sm">
        <div className="flex-center p-5">
            {currentYear} {APP_NAME}. All Rights Reserved
        </div>
        <p className="text-sm text-center">This project was created for learning purposes only and is not an actual online store.</p>
    </footer>
  );
};

export default Footer;