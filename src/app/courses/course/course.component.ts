import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { LessonEntityService } from '../services/lessons-entity.service';
import { CourseEntityService } from '../services/courses-entity.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  loading$: Observable<boolean> = of(false);

  constructor(
    private coursesService: CourseEntityService,
    private lessonService: LessonEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    //entities$ property access and get the data in store
    this.course$ = this.coursesService.entities$.pipe(map(courses => {
      return courses.find(course => {
        return course.url == courseUrl;
      });
    }));

    //withLatestFrom combine two observables, in that case courses$ (the last) and lessons$ (with will get the value here, while courses$ already have the value)
    this.lessons$ = this.lessonService.entities$.pipe(withLatestFrom(this.course$), tap(([lessons, course]) => {
      if (this.nextPage == 0) {
        this.loadLessonsPage(course)
      }
    }), map(([lessons, course]) => {
      return lessons.filter(lesson => {
        return lesson.courseId == course.id;
      })
    }));

    setTimeout(() => {
      this.loading$ = this.lessonService.loading$;
    }, 500);
  }


  loadLessonsPage(course: Course) {
    this.lessonService.getWithQuery({
      "courseId": course.id.toString(),
      "pageNumber": this.nextPage.toString(),
      "pageSize": 3
    });

    this.nextPage += 1;
  }

}
