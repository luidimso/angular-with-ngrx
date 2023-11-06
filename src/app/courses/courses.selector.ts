
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCourses from "./reducers/course.reducer";

export const selectCoursesState = createFeatureSelector<fromCourses.CoursesState>(fromCourses.courseFeatureKey);

export const selectAllCourses = createSelector(selectCoursesState, fromCourses.selectAll);

/*
here are the selectors needed for the corse home (HomeComponent): 

*******************************************************************

promoTotal$: Observable<number>;

loading$: Observable<boolean>;

beginnerCourses$: Observable<Course[]>;

advancedCourses$: Observable<Course[]>;

*/

//beginnerCourses$
export const selectBegginerCourses = createSelector(selectAllCourses, courses => {
    return courses.filter(course => {
        return course.category == "BEGINNER";
    });
});


//advancedCourses$
export const selectAdvancedCourses = createSelector(selectAllCourses, courses => {
    return courses.filter(course => {
        return course.category == "ADVANCED";
    });
});


//promoTotal$
export const selectPromoCourses = createSelector(selectAllCourses, courses => {
    return courses.filter(course => {
        return course.promo == true;
    }).length;
});


export const areCoursesLoaded = createSelector(selectCoursesState, state => {
    return state.allCoursesLoaded;
});