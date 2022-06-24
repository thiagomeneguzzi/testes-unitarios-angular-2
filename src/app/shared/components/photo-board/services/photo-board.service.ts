import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';

@Injectable()
export class PhotoBoardService {

  constructor(
    private http: HttpClient
  ) {}

  // Teste unitário usando HttpClientTestingModule só é recomendado caso,
  // haja alguma alteração dos dados vindos do backend

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3000/photos')
      .pipe(map(photos => {
        return photos.map(photo => {
          return {...photo, description: photo.description.toUpperCase()}
        })
      }))
      .pipe(delay(2000))
  }
}
