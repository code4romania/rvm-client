declare namespace ErrorModel {
	/**
	*	Error object model for consistency
	*/
	export interface RootObject {
		statusCode: number;
		error: string;
		message: string;
		attributes?: any;
	}
	/**
	*	Error message object model for consistency
	*/
	export interface ErrorMessageObject {
		id: number;
		error: string;
		type: string;
		serviceUrl: string;
	}
}
