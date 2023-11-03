import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

// first paramter: the name of the action
// second paramter: the type of object (payload) that it receives
export const login = createAction("[Login Page] User Login", props<{user: User}>());