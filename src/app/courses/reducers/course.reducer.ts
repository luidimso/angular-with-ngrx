import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../actions-type";

export interface CoursesState extends EntityState<Course>{};

export const courseFeatureKey = 'courses';

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(initialCoursesState, on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addMany(action.courses, state);
}));