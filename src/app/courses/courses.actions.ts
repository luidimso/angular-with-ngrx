import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

// loadAllCourses action only is called when enter on courses home page, then it run the action allCoursesLoaded by effect 

export const loadAllCourses = createAction("[Courses Resolver] Load All Courses");

export const allCoursesLoaded = createAction("[Load Courses Effect] All Courses Loaded", props<{courses: Course[]}>());