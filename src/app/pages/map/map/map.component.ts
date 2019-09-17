import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { MapService } from '../map.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	ids: any[];
	adjustments: any =	{
			'Dambovita': {
				vol_x: -15,
				vol_y: 20,
				res_x: -5,
				res_y: -10
			},
			'Tulcea': {
				vol_x: -35,
				vol_y: 0,
				res_x: -35,
				res_y: 0
			},
			'Ialomita': {
				vol_x: 0,
				vol_y: -5,
				res_x: 0,
				res_y: -5
			},
			'Constanta': {
				vol_x: 15,
				vol_y: 0,
				res_x: 15,
				res_y: 0
			},
			'Alba': {
				vol_x: 10,
				vol_y: -20,
				res_x: 10,
				res_y: -20,
			},
			'Timis': {
				vol_x: 0,
				vol_y: -10,
				res_x: 0,
				res_y: -10,
			},
			'Cluj': {
				vol_x: 0,
				vol_y: 20,
				res_x: 0,
				res_y: 20,
			},
			'Neamt': {
				vol_x: -10,
				vol_y: 0,
				res_x: -10,
				res_y: 0,
			},
			'Brasov': {
				vol_x: -20,
				vol_y: 0,
				res_x: -20,
				res_y: 0,
			},
			'Ilfov': {
				vol_x: -15,
				vol_y: 10,
				res_x: 10,
				res_y: -15
			},
			'Harghita': {
				vol_x: 0,
				vol_y: 15,
				res_x: 0,
				res_y: 15
			},
			'Mehedinti': {
				vol_x: 0,
				vol_y: 20,
				res_x: 10,
				res_y: -25
			},
			'Salaj': {
				vol_x: -10,
				vol_y: 0,
				res_x: -10,
				res_y: 0
			},
			'Olt': {
				vol_x: 10,
				vol_y: 0,
				res_x: 10,
				res_y: 0
			},
		};
	hasclicked = false;
	previous: any;
	// @HostListener('mouseover', ['$event']) onMouseOver(event: any) {
	// 	if (event.target.nodeName === 'path') {
	// 		//
	// 	}
	// }

	// @HostListener('mouseout', ['$event']) onMouseOut(event: any) {
	// 	if (event.target.nodeName === 'path') {
	// 		this.deselectCountybyId(event.target.getAttribute('id'), event);
	// 	}
	// }

	@HostListener('click', ['$event']) onClick(event: any) {
		console.log(this.ids);
		if (this.hasclicked) {
			if (event.target.nodeName === 'path') {
				if (this.previous && this.previous.id) {
					this.deselectCountybyId(this.previous.id, this.previous.event);
				}
				this.selectCountybyId(event.target.getAttribute('id'), event);
			} else {
				if (this.previous && this.previous.id) {
					this.deselectCountybyId(this.previous.id, this.previous.event);
				}
				this.hasclicked = false;
				// this.deselectCountybyId(this.previous.id, this.previous.id);
			}
		} else {
			if (event.target.nodeName === 'path') {
				this.hasclicked = true;
				this.selectCountybyId(event.target.getAttribute('id'), event);
			}
		}
	}

	constructor(private mapservice: MapService) {
	}

	ngOnInit() {
		this.mapservice.getMapFilters().subscribe((res: any) => {
			res.map((elem: any) => {

				elem.id = elem._id;
				elem.icons = [];
				if (elem.nrResurse !== 0) {
					elem.icons.push('res');
				}
				if (elem.nrVoluntari !== 0) {
					elem.icons.push('vol');
				}
				return elem;
			});
			this.ids = res;
			setTimeout(() => {
				this.setIcons();
			}, 0);
		});
	}

	setIcons() {
		for (let i = 0; i < this.ids.length; i++) {
			if (this.ids[i].name !== 'București' && this.ids[i].name !== 'Ilfov') {
				this.setIcon(i);
			}
		}
	}

	setIcon(i: any) {
		const p = (document.getElementById(this.ids[i].id) as any).getBBox();
		const cx = p.x + p.width / 2;
		const cy = p.y + p.height / 2;
		const adjust = this.adjustments[this.ids[i].slug];
		if (this.ids[i].icons.includes('res')) {
			const res = document.getElementById('icon_res_' + this.ids[i].id);
			res.setAttribute('x',  String(cx - 20 + (adjust ? adjust.res_x : 0)));
			res.setAttribute('y',  String(cy - 10 + (adjust ? adjust.res_y : 0)));
			res.setAttribute('width', '20');
			res.setAttribute('height', '20');
		}
		if (this.ids[i].icons.includes('vol')) {
			const vol = document.getElementById('icon_vol_' + this.ids[i].id);
			vol.setAttribute('x',  String(cx + 5 + (adjust ? adjust.vol_x : 0)));
			vol.setAttribute('y',  String(cy - 10 + (adjust ? adjust.vol_y : 0)));
			vol.setAttribute('width', '20');
			vol.setAttribute('height', '20');
		}
	}

	selectCountybyId(id: any, e: any) {
		if (e.target && e.target.nodeName === 'path') {
			this.previous = {id: id, event: e};
			const p = e.target.getBBox();
			const cx = p.x + p.width / 2;
			const cy = p.y + p.height / 2;
			this.tooltip(cx, cy,
				this.ids.find(x => x.id === id).name +
				'<br/> Resurse: ' + this.ids.find(x => x.id === id).nrResurse +
				'<br/> Voluntari: ' + this.ids.find(x => x.id === id).nrVoluntari);
			e.target.setAttribute('fill', '#264998');
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
			text.setAttribute('fill', '#000000');
			const rect = document.getElementById('recttest');
			rect.setAttribute('x',   String(x - (p.width / 2) - 5));
			rect.setAttribute('y',   String(y - (p.height / 2) - 5));
			rect.setAttribute('width', p.width + 10);
			rect.setAttribute('height', p.height + 10);
			rect.setAttribute('fill', '#ffffff');
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

	deselectCountybyId(id: any, e: any) {
		if (e.target && e.target.nodeName === 'path') {
			const p = e.target.getBBox();
			const cx = p.x + p.width / 2;
			const cy = p.y + p.height / 2;

			this.tooltipOut();

			e.target.setAttribute('fill', '#f3d973');
		}
	}
}
