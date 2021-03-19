import { defineInterface } from '@/interfaces/define';
import InterfaceDateText from './date-text.vue';

export default defineInterface(({ i18n }) => ({
	id: 'date-text',
	name: 'Date text',
	description: 'Date text input with validation',
	icon: 'today',
	component: InterfaceDateText,
	types: ['dateTime', 'date'],
	options: [
		/*{
			field: 'includeSeconds',
			name: i18n.t('interfaces.datetime.include_seconds'),
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'toggle',
			},
			schema: {
				default_value: false,
			},
		},
		{
			field: 'use24',
			name: i18n.t('interfaces.datetime.use_24'),
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'toggle',
			},
			schema: {
				default_value: true,
			},
		},*/
	],
	recommendedDisplays: ['datetime'],
}));
