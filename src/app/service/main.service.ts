import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService<T extends { id: number }> {
  // apiUrl: string = 'http://localhost:3000';
  entityName: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    public config: ConfigService,
    public http: HttpClient,
    @Inject('entityName') entityName: string
  ) {
    this.entityName = entityName;
  }

  getAll(): void {
    this.http.get<T[]>(`${this.config.apiUrl}/${this.entityName}`).subscribe(
      (list) => this.list$.next(list),
      (err) => console.error(err)
    );
  }

  get(id: number): Observable<T> {
    return Number(id) === 0
      ? new Observable<T>()
      : this.http.get<T>(`${this.config.apiUrl}/${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http
      .post<T>(`${this.config.apiUrl}/${this.entityName}`, entity)
      .pipe(tap((e) => this.getAll()));
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.config.apiUrl}/${this.entityName}/${entity.id}`,
      entity
    );
    // ).pipe(tap(() => this.getAll()));
  }

  // remove(entity: T): Observable<T> {
  remove(entity: T | number): Observable<T> {
    let entityId = typeof entity === 'number' ? entity : entity.id;
    return this.http.delete<T>(
      // `${this.config.apiUrl}/${this.entityName}/${entity.id}`
      `${this.config.apiUrl}/${this.entityName}/${entityId}`
    );
    // ).pipe(tap(() => this.getAll()));
  }

  like(key: string, value: string, limit: number = 10): Observable<T[]> {
    key = `${key}_like`;
    const query = `${this.config.apiUrl}/${this.entityName}?${key}=${value}&_limit=${limit}`;
    return this.http.get<T[]>(query);
  }

  fullText(value: string): Observable<T[]> {
    const query = `${this.config.apiUrl}/${this.entityName}?q=${value}`;
    return this.http.get<T[]>(query);
  }
}
