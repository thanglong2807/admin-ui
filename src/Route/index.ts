import {v4 as uuidv4} from "uuid"
import Admin from "../Page/Admin";
import Landing from "../Page/Landing";
import Login from "../Page/Login";
import Product from "../Page/Product";
export interface Route {
    id:string,
  path: string;
  element: React.ComponentType<any>;
}

export const publicRouter: Route[] = [
  {
    id:uuidv4(),
    path: "/login",
    element: Login,
  },
  {
    id:uuidv4(),

    path: "/",
    element: Landing,

  },
];

export const privateRouter: Route[] = [
  {
    id:uuidv4(),
    path: "/admin",
    element: Admin,

  },
  {
    id:uuidv4(),
    path: "/admin/product",
    element: Product,

  },
];
