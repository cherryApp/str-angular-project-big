import { Category } from './../model/category';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverUrl: string = `http://localhost:3000/category`;
  list$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient, private toastr: ToastrService) { }

getAll(): void {
    this.list$.next([]);
    this.http.get<Category[]>(this.serverUrl).subscribe(
      category => this.list$.next(category)
    );
  }

  get(id: number): Observable<Category> {
    return Number(id) === 0 ? of(new Category()) : this.http.get<Category>(`${this.serverUrl}/${Number(id)}`);
  }

  update(category: Category): Observable<Category> {
    return this.http.patch<Category>(
      `${this.serverUrl}/${category.id}`,
      category
    ).pipe(
      tap(() => {
        this.getAll();
        this.toastr.info('The category has been updated.', 'UPDATED');
      })
    );
  }

  create(category: Category): void {
    this.http.post<Category>(
      `${this.serverUrl}`,
      category
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.success('The category has been created.', 'NEW Product');
  }

  remove(category: Category): void {
    this.http.delete<Category>(
      `${this.serverUrl}/${category.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.warning('The category has been deleted.', 'DELETED');
  }
}
  export class ColumnSortOrder {
    id = "none";
    name = "none";
    description = "none";
  }

