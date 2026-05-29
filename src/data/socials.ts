import type { SocialLink } from "@/types";
import {SiGithub, SiInstagram, SiLinkedin, SiTelegram} from "react-icons/si";
import { SiX } from "react-icons/si";

export const socials: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Xurliman/",
    icon: SiGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/khurliman-jumamuratova/",
    icon: SiLinkedin,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/xurjumon",
    icon: SiInstagram,
  },
  {
    name: "Telegram",
    url: "https://t.me/xurjumon",
    icon: SiTelegram,
  },
];
