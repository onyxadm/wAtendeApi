import {
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	IN8nHttpFullResponse,
	INodeExecutionData,
} from 'n8n-workflow';
import { ApiError, Credentials, wa } from './wAtendeApi';

function join(...paths: string[]) {
	let url = '/';
	paths.forEach((path) => (url += `${path}`));
	return url;
}

export function requestURL(path: string) {
	return join(path, '?instance_id={{$credentials.instance_id}}');
	// https://whatsapi.watende.com.br/send/text?instance_id=649A37XXXXX
}

export async function sendErrorPostReceive(
	this: IExecuteSingleFunctions,
	data: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const body = response?.body as ApiError;
	if (!body?.error) {
		return data;
	}

	const node = this.getNode();
	const creds = (await this.getCredentials('wAtendeCredsApi')) as Credentials;
	creds['access_token'] = creds.access_token.toUpperCase().includes('BEARER') ? creds.access_token :  'Bearer ' + creds.access_token;
	Object.assign(node.credentials as {}, { creds });

	throw {
		httpCode: body.status,
		context: body.error,
		cause: { error: body.error, message: body.message },
		node,
		workflow: this.getWorkflow(),
		message: `${body.error} - statusCode ${body.status}`,
		description: 'Check the type of properties and values entered',
	};
}

export async function setAutHeader(
	this: IExecuteSingleFunctions,
	requestOpyions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const creds = (await this.getCredentials('wAtendeCredsApi')) as Credentials;

	const value = creds.access_token.toUpperCase().includes('BEARER') ? creds.access_token :  'Bearer ' + creds.access_token;
	Object.assign(requestOpyions.headers as {}, { ['Content-Type']: 'application/json' });
	Object.assign(requestOpyions.headers as {}, { ['Authorization']: value });

	return requestOpyions;
}

export async function adjustOptionalFields(
	this: IExecuteSingleFunctions,
	requestOpyions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOpyions.body;// as { options: wa.OptionsMessage };

	// if (body.options.presence === false) {
	// 	delete body.options.presence;
		requestOpyions.body = body;
	// }

	return requestOpyions;
}

export async function mediaMessage(
	this: IExecuteSingleFunctions,
	requestOpyions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const params = this.getNode().parameters;
	const creds = (await this.getCredentials('wAtendeCredsApi')) as Credentials;
	if(params?.mediaType === 'waAudio') {
		requestOpyions.url = `/send/audio?instance_id=${creds.instance_id}`;
		const body = {  ...(requestOpyions.body as wa.MediaMessge) };
		requestOpyions.body = {
			phone: body.phone,
			url: body.url,
			is_message_voice: true,
		};
	}

	return requestOpyions;
}
