import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService {

	constructor(private http: HttpClient) { }

	getPosters(): Observable<any> {
		const formData = new FormData();
		const req =  {
			"Method": 'GetEvents'
		};
		formData.append('json', JSON.stringify(req))
		return this.http.post('http://localhost:64064/', formData);
	}
}
