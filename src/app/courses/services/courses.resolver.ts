import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CourseEntityService } from "./courses-entity.service";
import { filter, first, map, tap } from "rxjs/operators";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
    constructor(
        private coursesService: CourseEntityService
    ){}

    //the CourseEntityService can reach directly the backend service database, and have the CRUD methods such as getAll, so getAll will return all the courses from database as entity
    //getAll method call to the backend service and already dispatch it to the store
    //resolve needs to pass boolean because it controls the route guard, which defines if the page can accessed
    //CourseEntityService has the property loaded that returns a boolean that indicats if the data already was loaded on store
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.coursesService.loaded$.pipe(tap(loaded => {
            if(!loaded) {
                this.coursesService.getAll();
            }
        }), filter(loaded => !!loaded), first());
    }
}