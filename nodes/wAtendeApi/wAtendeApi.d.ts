export type ApiError = {
	error: string | string[];
	message: string | string[];
	status: number;
};

export type Credentials = {
	baseUrl: string;
	instance_id: string;
	access_token: string;
};

export namespace wa {
	// export type OptionsMessage = {
	// 	delay?: number;
	// 	presence?: 'unavailable' | 'available' | 'composing' | 'recording' | 'paused' | false;
	// };

	export type ButtonMessage = {
		title: string;
		description: string;
		footerText?: string;
		buttons: { buttonText: string; buttonId: string }[];
		mediaMessage?: object;
	};

	export type ListMessage = {
		title: string;
		description: string;
		buttonText: string;
		footerText?: string;
		sections: {
			title: string;
			rows: {
				title: string;
				description: string;
				rowId: string;
			}[];
		}[];
	};

	export type MediaMessge = {
		phone: string,
		message: string,
		filename?: string,
		url?: string,
		is_message_voice?: boolean,
	}
}
