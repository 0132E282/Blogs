import { User } from "./user";

export type Category = {
  meta_keywords: never[];
  children?: Category[] | [];
  parent: Category;
  type: "blogs" | "products";
  name: string;
  parent_id: number;
  id: number;
  slug: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  status: "active" | "inactive";
  description: string;
  user: User[];
};
