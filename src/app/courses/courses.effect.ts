import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./actions-type";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./services/courses-http.service";
import { allCoursesLoaded } from "./courses.actions";

@Injectable()
export class CoursesEffects {
    loadCourses$ = createEffect(() => this.action$.pipe(ofType(CourseActions.loadAllCourses), concatMap(action => {
        return this.coursesService.findAllCourses();
    }), map(courses => {
        return allCoursesLoaded({courses})
    })));

    constructor(
        private action$: Actions,
        private coursesService: CoursesHttpService
    ) {}
}