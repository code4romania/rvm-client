declare namespace Authentication {
	/*
	*	Login payload model to be sent to server
	*/
	export interface LoginPayload {
		username: string;
		password: string;
	}
/*
	*	Signup payload model to be sent to server
	*/
	export interface SignupPayload {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		password: string;
		cPassword: string;
	}
	/*
	*	User model to be stored in credentials
	*/
	export interface User {
		_id: string;
		role: string;
		firstName: string;
		lastName: string;
		emailVerified: boolean;
		emailHash: string;
		passwordLastUpdated?: any;
		lastLogin: Date;
		phone?: any;
		email: string;
		createdAt: Date;
		updatedAt: Date;
		organisation?: any;
		institution?: any;
	}
	/*
	*	Credential model to be stored in local storage
	*/
	export interface Credentials {
		token: string;
		user: User;
	}
}
