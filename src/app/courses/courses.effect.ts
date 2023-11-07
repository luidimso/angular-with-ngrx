import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./actions-type";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
    // This effect first call the service findALLCourses, then it is finished, it calls the action allCoursesLoaded passing the courses returned as paramter on first call
    // ConcatMao was used to run each method on order, like first we have to call coursesService.findAllCourses, then call the allCoursesLoaded action passing corses as paramter
    loadCourses$ = createEffect(() => this.action$.pipe(ofType(CourseActions.loadAllCourses), concatMap(action => {
        return this.coursesService.findAllCourses();
    }), map(courses => {
        return CourseActions.allCoursesLoaded({courses})
    })));

    // dispatch false mean that this effect will not dispatch any action after
    saveCourse$ = createEffect(() => this.action$.pipe(ofType(CourseActions.courseUpdate), concatMap(action => {
        return this.coursesService.saveCourse(action.update.id, action.update.changes);
    })), {
        dispatch: false
    });

    constructor(
        private action$: Actions,
        private coursesService: CoursesHttpService
    ) {}
}