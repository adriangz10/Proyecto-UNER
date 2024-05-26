import { HttpInterceptorFn } from "@angular/common/http";

export const LoginInterceptor: HttpInterceptorFn = 
     (req, next) => {
        console.log(req.url)
    const token:string|null = sessionStorage.getItem('token');
    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
        });  console.log(cloned)
        return next(cloned);
    }
   
   
    return next(req);
    
}
