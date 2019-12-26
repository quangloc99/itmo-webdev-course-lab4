import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class BaseUrlHttpInceptor implements HttpInterceptor{
  constructor(@Inject('APP_BASE_URL') private baseUrl: string) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({url: this.baseUrl +  req.url});
    return next.handle(newReq);
  }
}
