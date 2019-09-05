import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { MapService } from '../map.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
	ids = [
	{id: 'ROU122', name: 'Dolj', icons: []},
	{ id: 'ROU123', name: 'Gorj', icons: []},
	{ id: 'ROU124', name: 'Mehedinți', icons: []},
	{ id: 'ROU126', name: 'Olt', icons: []},
	{ id: 'ROU127', name: 'Teleorman', icons: []},
	{ id: 'ROU128', name: 'București', icons: []},
	{ id: 'ROU129', name: 'Călărași', icons: []},
	{ id: 'ROU130', name: 'Dâmbovița', icons: []},
	{ id: 'ROU131', name: 'Giurgiu', icons: []},
	{ id: 'ROU132', name: 'Ialomița', icons: []},
	{ id: 'ROU133', name: 'Constanța', icons: []},
	{ id: 'ROU276', name: 'Arad', icons: []},
	{ id: 'ROU277', name: 'Bihor', icons: []},
	{ id: 'ROU278', name: 'Caraș-Severin', icons: []},
	{ id: 'ROU280', name: 'Timiș', icons: []},
	{ id: 'ROU287', name: 'Botoșani', icons: []},
	{ id: 'ROU294', name: 'Alba', icons: []},
	{ id: 'ROU295', name: 'Bistrița-Năsăud', icons: []},
	{ id: 'ROU296', name: 'Cluj', icons: []},
	{ id: 'ROU297', name: 'Hunedoara', icons: []},
	{ id: 'ROU298', name: 'Maramureș', icons: []},
	{ id: 'ROU299', name: 'Mureș', icons: []},
	{ id: 'ROU300', name: 'Sălaj', icons: []},
	{ id: 'ROU301', name: 'Satu Mare', icons: []},
	{ id: 'ROU302', name: 'Argeș', icons: []},
	{ id: 'ROU303', name: 'Sibiu', icons: []},
	{ id: 'ROU304', name: 'Vâlcea', icons: []},
	{ id: 'ROU305', name: 'Brașov', icons: []},
	{ id: 'ROU306', name: 'Covasna', icons: []},
	{ id: 'ROU307', name: 'Harghita', icons: []},
	{ id: 'ROU308', name: 'Iași', icons: []},
	{ id: 'ROU309', name: 'Neamț', icons: []},
	{ id: 'ROU310', name: 'Prahova', icons: []},
	{ id: 'ROU311', name: 'Suceava', icons: []},
	{ id: 'ROU312', name: 'Bacău', icons: []},
	{ id: 'ROU313', name: 'Brăila', icons: ['res']},
	{ id: 'ROU314', name: 'Buzău', icons: []},
	{ id: 'ROU315', name: 'Galați', icons: []},
	{ id: 'ROU316', name: 'Vaslui', icons: []},
	{ id: 'ROU317', name: 'Vrancea', icons: []},
	{ id: 'ROU4844', name: 'Ilfov', icons: []},
	{ id: 'ROU4847', name: 'Tulcea', icons: []}] as any[];
		hasclicked = false;
		previous: any;
	// @HostListener('mouseover', ['$event']) onMouseOver(event: any) {
	// 	if (event.target.nodeName === 'path') {
	// 		//
	// 	}
	// }

	// @HostListener('mouseout', ['$event']) onMouseOut(event: any) {
	// 	if (event.target.nodeName === 'path') {
	// 		this.testOut(event.target.getAttribute('id'), event);
	// 	}
	// }

	@HostListener('click', ['$event']) onClick(event: any) {
		if (this.hasclicked) {
			if (event.target.nodeName === 'path') {
				this.testOut(this.previous.id, this.previous.event);
				this.test(event.target.getAttribute('id'), event);
			} else {
				console.log(event.path);
				// this.hasclicked = false;
				// this.testOut(this.previous.id, this.previous.id);
			}
		} else {
			this.hasclicked = true;
			if (event.target.nodeName === 'path') {
				this.test(event.target.getAttribute('id'), event);
			}
		}
	}

	constructor(private mapservice: MapService) { }

	ngOnInit() {

	}

	ngAfterViewInit() {
		for (let i = 0; i < this.ids.length; i++) {
			if (this.ids[i].icons.length > 0) {
				this.setIcon(this.ids[i].id);
			}
		}
	}

	setIcon(i: any) {
		const p = (document.getElementById(i) as any).getBBox();
		const cx = p.x + p.width / 2;
		const cy = p.y + p.height / 2;
		const rect = document.getElementById('icon_' + i);
		rect.setAttribute('x',  String(cx - 10));
		rect.setAttribute('y',  String(cy - 10));
		rect.setAttribute('width', '20');
		rect.setAttribute('height', '20');
	}

	test(id: any, e: any) {
		if (e.target && e.target.nodeName === 'path') {
			this.previous = {id: id, event: e};
			const p = e.target.getBBox();
			const cx = p.x + p.width / 2;
			const cy = p.y + p.height / 2;
			// this.tooltip(cx, cy, this.ids.find(x => x.id === id).name);
			this.tooltip(cx, cy, this.ids.find(x => x.id === id).name + '<br/> Resurse: 20 <br/>Voluntari: 2');
			e.target.setAttribute('fill', '#00ff00');
		}
	}

	tooltip(x: any, y: any, txt: string) {
		const text: any = document.getElementById('recttext');
		text.innerHTML = txt;
		const p = text.getBBox();
		setTimeout(function() {
			text.setAttribute('width', p.width - 110);
			text.setAttribute('height', p.height + 110);
			text.setAttribute('x', String(x - p.width / 2 - p.x));
			text.setAttribute('y',  String(y - p.height / 2 - p.y));

			const rect = document.getElementById('recttest');
			rect.setAttribute('x',   String(x - (p.width / 2) - 5));
			rect.setAttribute('y',   String(y - (p.height / 2) - 5));
			rect.setAttribute('width', p.width + 10);
			rect.setAttribute('height', p.height + 10);
		}, 0);

	}

	tooltipOut() {
		const text = document.getElementById('recttext');
		text.innerHTML = '';
		text.setAttribute('x', '0');
		text.setAttribute('y', '0');

		const rect = document.getElementById('recttest');
		rect.setAttribute('x', '0');
		rect.setAttribute('y', '0');
		rect.setAttribute('width', '0');
		rect.setAttribute('height', '0');
	}

	testOut(id: any, e: any) {
		if (e.target && e.target.nodeName === 'path') {
			const p = e.target.getBBox();
			const cx = p.x + p.width / 2;
			const cy = p.y + p.height / 2;

			this.tooltipOut();

			e.target.setAttribute('fill', '#f3d973');
		}
	}
}
