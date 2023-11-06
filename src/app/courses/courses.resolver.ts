import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./courses.actions";
import * as courseSelector from "./courses.selector";

@Injectable()
export class CoursesResolver implements Resolve<any> {
    loading = false;

    constructor(
        private store: Store<AppState>
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(select(courseSelector.areCoursesLoaded), tap((coursesLoaded) => {
            if(!this.loading && !coursesLoaded) {
                this.loading = true;
                this.store.dispatch(loadAllCourses());
            }
        }), filter(coursesLoaded => {
            return coursesLoaded;
        }), first(), finalize(() => this.loading = false));
    }
}