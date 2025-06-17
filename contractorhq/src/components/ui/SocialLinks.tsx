import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

const links = [
  {
    icon: <FaInstagram size={18} />,
    name: "Instagram",
    color: "bg-gradient-to-br from-pink-500 to-purple-600",
    path: "https://www.instagram.com/",
  },
  {
    icon: <FaFacebook size={18} />,
    name: "Facebook",
    color: "bg-blue-600",
    path: "https://www.facebook.com/",
  },
  {
    icon: <FaYoutube size={18} />,
    name: "YouTube",
    color: "bg-red-600",
    path: "https://www.youtube.com/",
  },
  {
    icon: <FaLinkedin size={18} />,
    name: "LinkedIn",
    color: "bg-blue-700",
    path: "https://www.linkedin.com/",
  },
];

export default function SocialLinks() {
  return (
    <div className="bg-light p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-dark mb-2 flex items-center justify-center gap-2">
          <span className="text-primary">Connect</span> With Us
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Follow for exclusive content, tool releases, and professional insights
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md`}
            aria-label={`Follow on ${link.name}`}
          >
            <span className="text-white">{link.icon}</span>
            <span className="text-white font-medium text-sm">{link.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Join our community of construction professionals
        </p>
      </div>
    </div>
  );
}
