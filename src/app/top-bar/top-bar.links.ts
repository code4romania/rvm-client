export const TopBarLinks: TopBarLink[] = [
	{
		label: 'Voluntari',
		routerLink: '/volunteers',
	},
	{
		label: 'Resurse',
		routerLink: '/resources',
		condition: "authService.is('DSU', 'NGO')"
	},
	{
		label: 'Organizații',
		routerLink: '/organisations',
		condition: "authService.is('DSU')"
	},
	{
		label: 'Utilizatori',
		routerLink: '/users',
		condition: "authService.is('DSU', 'INS')"
	},
	{
		label: 'Hartă',
		routerLink: '/map',
		condition: "authService.is('DSU')"
	},
	{
		label: 'Info',
		routerLink: '/info'
	}
];

export class TopBarLink {
	public label: string;
	public routerLink: string;
	public condition?: string;
}