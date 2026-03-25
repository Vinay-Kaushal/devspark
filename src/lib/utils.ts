import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) return date.toLocaleDateString();
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}...`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "beginner":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    case "intermediate":
      return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    case "advanced":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}