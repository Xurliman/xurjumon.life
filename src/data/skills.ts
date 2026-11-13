import type { Skill } from "@/types";
import {
  SiGo,
  SiPostgresql,
  SiRedis,
  SiTemporal,
  SiDocker,
  SiKubernetes,
  SiPrometheus,
  SiLinux,
  SiGit,
  SiPhp,
  SiMysql,
  SiMongodb,
} from "react-icons/si";
import { Waypoints } from "lucide-react";

export const skills: Skill[] = [
  { name: "Go", icon: SiGo },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Temporal", icon: SiTemporal },
  { name: "gRPC", icon: Waypoints },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Prometheus", icon: SiPrometheus },
  { name: "Linux", icon: SiLinux },
  { name: "Git", icon: SiGit },
  { name: "PHP (Laravel)", icon: SiPhp },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
];
