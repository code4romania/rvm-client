import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {
	/**
	 * top bar to be shown over all the other components
	 */
	constructor(public authService: AuthenticationService,
		private router: Router) { }

	ngOnInit() { }

	ngAfterViewInit() {
		this.onResized();
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.onResized();
	}

	onResized() {
		var btn = document.getElementById("nav-btn");
		var vlinks = document.getElementById("ulVisibleLinks");
		var vlinksChildren = vlinks.getElementsByTagName("li");
		var hlinks = document.getElementById("ulHiddenLinks");
		var hlinksChildren = hlinks.getElementsByTagName("li");

		var numVisibleItems = 0;
		var totalItems = vlinksChildren.length + hlinksChildren.length;
		var totalSpace = document.getElementById("divVisibleLinks").clientWidth - 30;
		var usedSpace = 0;
		var remainingSpace = totalSpace - usedSpace;

		// get all links in one array
		var initiallength = hlinksChildren.length;
		for (var k = 0; k < initiallength; k++) {
			vlinks.append(hlinksChildren[0]);
		}

		// set visible links
		for (var i = 0; i < vlinksChildren.length; i++) {
			if (vlinksChildren[i].clientWidth < remainingSpace) {
				usedSpace += vlinksChildren[i].clientWidth;
				remainingSpace = totalSpace - usedSpace;
				numVisibleItems++;
			} else {
				break;
			}
		}

		// set hidden links
		for (var j = vlinksChildren.length - 1; j >= numVisibleItems; j--) {
			hlinks.prepend(vlinksChildren[j]);
		}

		// update height of dropdown menu
		var divHiddenLinks = document.getElementById("divHiddenLinks");
		var newHeight = hlinksChildren.length * 60 + 20 + 'px';
		divHiddenLinks.style.height = newHeight;

		// if no items visible, add 'Menu' to button
		if (numVisibleItems == 0) {
			btn.innerText = "Menu";
		} else {
			btn.innerText = "";
		}

		// if all items visible, hide the button
		if (numVisibleItems == totalItems) {
			btn.classList.add("d-none");
			divHiddenLinks.classList.add("d-none");
		} else {
			btn.classList.remove("d-none");
			divHiddenLinks.classList.remove("d-none");
		}
	}

	/**
	   * logout from account
	   */
	logout() {
		this.authService.logout().subscribe(
			(didlogout: Boolean) => {
				if (didlogout) {
					this.router.navigate(['/login']);
				}
			},
			(error: any) => {
				console.log('logout error: ', error);
			});
	}

	/**
	   * go to home path on icon click
	   */
	goToDashboard() {
		this.router.navigate(['/' + this.authService.homePath()], {
			replaceUrl: true
		});
	}

}
