import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl:string) { }

  private url(requestParameter: Partial<RequestParameters>) : string {
    return `${ requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl }/${ requestParameter.controller }${ requestParameter.action ? `/${ requestParameter.action }` : "" }`;
  }


  get<Type>(requestParameter: Partial<RequestParameters>, id?: string) : Observable<Type> {
    let url : string = "";

    if(requestParameter.fullEndPoint) 
      url = requestParameter.fullEndPoint;
    
    else 
      url = `${this.url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    
    return this.httpClient.get<Type>(url, {headers:requestParameter.headers});
  }
  
  post<Type>(requestParameter: Partial<RequestParameters>, body: Partial<Type>) : Observable<Type> {
    
    let url : string = "";
    if(requestParameter.fullEndPoint) 
      url = requestParameter.fullEndPoint;
    
    else 
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    
    return this.httpClient.post<Type>(url, body, { headers: requestParameter.headers });
  }
  
  put<Type> (requestParameter: Partial<RequestParameters>, body: Partial<Type>) : Observable<Type> {
    let url : string = "";
    if(requestParameter.fullEndPoint) 
      url = requestParameter.fullEndPoint;
    
    else 
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    
    return this.httpClient.put<Type>(url, body, { headers: requestParameter.headers });
  }
  
  delete<Type> (requestParameter: Partial<RequestParameters>, id:string) : Observable<Type> {
    let url : string = "";
    if(requestParameter.fullEndPoint) 
      url = requestParameter.fullEndPoint;
    
    else 
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    return this.httpClient.delete<Type>(url,{ headers:requestParameter.headers });
  }
}


export class RequestParameters {
  controller? : string;
  action?: string;
  queryString?:string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string; //farklı servislere istek gönderecek kapasiteyi ekliyor
}