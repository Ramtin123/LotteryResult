import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class ApiService {
    constructor(private http: Http) {

    }
    public getLotteryPrograms() {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:58775//api/LotteryPrograms/', options)
            .map(this.extractData)
            .catch(this.handleError);

    }
    public getLotterWinners(lotteryprogramId: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`http://localhost:58775/api/LotteryPrograms/${lotteryprogramId}`, options)
            .map(this.extractData)
            .catch(this.handleError);
    }




    private extractData(res: Response) {
        return res.json() || {};
    }
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}