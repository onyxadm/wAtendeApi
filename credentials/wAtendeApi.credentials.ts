import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class wAtendeApi implements ICredentialType {
	name = 'wAtendeCredsApi';
	displayName = 'wAtendeApi API';
	documentationUrl = 'https://github.com/onyxadm/wAtendeApi';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			noDataExpression: true,
			required: true,
			default: 'https://sender.watende.com.br',
			placeholder: 'https://sender.watende.com.br',
			hint: 'Enter the default url for requests.',
		},

		{
			displayName: 'Instance Id',
			name: 'instance_id',
			type: 'string',
			noDataExpression: true,
			default: '',
			required: true,
			description: 'InstanceId of account.',
		},

		{
			displayName: 'Authentication - Bearer Token',
			name: 'access_token',
			required: true,
			placeholder: 'Bearer Token',
			type: 'string',
			default: '',
			noDataExpression: true,
			typeOptions: { password: false },
		},
	];
}
