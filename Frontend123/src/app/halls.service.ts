import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HallsService {


	constructor(private http: HttpClient) {

	}

	public getHalls(): Observable<any> {
		const formData = new FormData();
		const req = {
			"Method": 'GetHalls'
		}
		formData.append('json', JSON.stringify(req))
		return this.http.post('http://localhost:64064/', formData);
	}

}
