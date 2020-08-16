import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceCallerService {

  private httpHeaders = {
    'Authorization': '',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Headers': 'content-type, authorization, accept',
    'Access-Control-Allow-Methods': '',
  };

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Method for making GET http calls based on a url
   * @param url request url
   */
  public get(url: string){
    this.httpHeaders["Access-Control-Allow-Methods"] = 'GET';
    return this.http.get(url, { headers: new HttpHeaders(this.httpHeaders)});
  }
}
