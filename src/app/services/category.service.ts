import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = 'http://localhost:3000/categories';

  categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getOneById(id: number | string): Observable<Category> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    let category$ : BehaviorSubject<Category> = new BehaviorSubject<Category>(new Category);
    this.http.get<Category>(`${this.apiUrl}/${id}`).subscribe(
      data => category$.next(data)
    )
    return category$;
  }

  create(category: Category):Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  update(category: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  remove(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${category.id}`);
  }
}
