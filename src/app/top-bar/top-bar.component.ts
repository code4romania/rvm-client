import { Component, OnInit } from '@angular/core';
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

	onNavBtn() {
		/*
		var hlinks = document.getElementById("ulHiddenLinks");
		if (hlinks.className.includes("d-none")) {
			hlinks.classList.remove("d-none")
		} else {
			hlinks.classList.add("d-none")
		}
		*/
	}

	onResized() {
		var btn = document.getElementById("greedy-nav-btn");
		var vlinks = document.getElementById("ulVisibleLinks");
		var vlinksChildren = vlinks.getElementsByTagName("li");
		var hlinks = document.getElementById("ulHiddenLinks");
		var hlinksChildren = hlinks.getElementsByTagName("li");

		var numVisibleItems = 0;
		var totalSpace = vlinks.clientWidth;
		var usedSpace = 0;
		var remainingSpace = totalSpace - usedSpace - 20;

		// get all links in one array
		for (var k = 0; k < hlinksChildren.length; k++) {
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

		// TODO update button
		var divHiddenLinks = document.getElementById("divHiddenLinks");
		var height = hlinksChildren.length * 60 + 20 + 'px';
		divHiddenLinks.style.height = height;

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
