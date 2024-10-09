import { Category } from "./categories";
import { User } from "./user";

export type Posts = {
  description: string;
  tags: { value: string; label: string; }[] | ({ value?: string | undefined; label?: string | undefined; } | undefined)[] | undefined;
  title: string;
  category: Category;
  content: string;
  status: "active" | "inactive";
  user: User;
  created_at: Date;
  updated_at: Date;
  id: number;
  slug: string;
  type: string;
  photo_url: string;
};
