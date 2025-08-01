import { HttpEvent, HttpHandler, HttpInterceptor,  HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
   
  private cache = new Map<string, HttpResponse<any>>();
  private ttl = 5 * 60 * 1000; // Cache time: 5 minutes
  private timestamps = new Map<string, number>();


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
     if (req.method !== 'GET') {
      return next.handle(req);
    }

     const cachedResponse = this.cache.get(req.urlWithParams);
    const cachedTime = this.timestamps.get(req.urlWithParams);
    const isExpired = cachedTime && (Date.now() - cachedTime > this.ttl);

    if (cachedResponse && !isExpired) {
      // console.log('Serving from cache:', req.urlWithParams);
      return of(cachedResponse.clone());
    }

    // console.log(' HTTP call:', req.urlWithParams);
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, event.clone());
          this.timestamps.set(req.urlWithParams, Date.now());
        }
      })
    );

  }


}
