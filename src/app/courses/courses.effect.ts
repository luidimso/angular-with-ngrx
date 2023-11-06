import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./actions-type";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
    // This effect first call the service findALLCourses, then it is finished, it calls the action allCoursesLoaded passing the courses returned as paramter on first call

    loadCourses$ = createEffect(() => this.action$.pipe(ofType(CourseActions.loadAllCourses), concatMap(action => {
        return this.coursesService.findAllCourses();
    }), map(courses => {
        return CourseActions.allCoursesLoaded({courses})
    })));

    constructor(
        private action$: Actions,
        private coursesService: CoursesHttpService
    ) {}
}