import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data"
import { Course } from "../model/course"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class CourseDataService extends DefaultDataService<Course> {
    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator
    ) {
        super("Course", http, httpUrlGenerator);
    }

    //getAll is a method from DefaultDataService, so we can customize that method to call any service and return any response
    getAll(): Observable<Course[]> {
        return this.http.get("/api/courses").pipe(map(res => res["payload"]));
    }
}