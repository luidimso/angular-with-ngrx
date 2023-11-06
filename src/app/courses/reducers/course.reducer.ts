import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../actions-type";

export interface CoursesState extends EntityState<Course>{
    allCoursesLoaded: boolean
};

export const courseFeatureKey = 'courses';

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

// on createReducer we can pass through the method "on" the effect espected on a action, in that example we have 2 actions with effects: allCoursesLoaded and courseUpdate
// the adapter, which is a entity adapter, have the CRUD methods to the store, like addMany, update
// the reducers only apply the actions on the store datas
export const coursesReducer = createReducer(initialCoursesState, on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addMany(action.courses, {
        ...state,
        allCoursesLoaded: true
    });
}), on(CourseActions.courseUpdate, (state, action) => {
    return adapter.updateOne(action.update, state);
}));

export const {selectAll} = adapter.getSelectors();