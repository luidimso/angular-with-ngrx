import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CourseEntityService } from "./courses-entity.service";
import { map } from "rxjs/operators";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
    constructor(
        private coursesService: CourseEntityService
    ){}

    //the CourseEntityService can reach directly the backend service database, and have the CRUD methods such as getAll, so getAll will return all the courses from database as entity
    //getAll method call to the backend service and already dispatch it to the store
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.coursesService.getAll().pipe(map(courses => !!courses));
    }
}