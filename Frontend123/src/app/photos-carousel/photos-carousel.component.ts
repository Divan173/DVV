import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-photos-carousel',
	templateUrl: './photos-carousel.component.html',
	styleUrls: ['./photos-carousel.component.css']
})
export class PhotosCarouselComponent implements OnInit {
	images: Array<string>;

	constructor() { }

	ngOnInit() {
		this.images = [
			'../../assets/img/photos/pic1.jpg',
			'../../assets/img/photos/pic2.jpg',
			'../../assets/img/photos/pic3.jpg',
		]
	}
}
