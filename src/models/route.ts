import { ReactNode } from "react";

export interface MyRoute {
  id: string;
  path: string;
  name: string;
  element: ReactNode;
}
