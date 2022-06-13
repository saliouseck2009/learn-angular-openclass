import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService : AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders()
        .append('Authorization', `Bearer ${this.authService.getToken()}`);
        const newRequest = req.clone({headers:headers});
        return next.handle(newRequest);
    }
    
}