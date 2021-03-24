import { defineInterface } from '@/interfaces/define';
import InterfaceDateText from './date-text.vue';
import { Field } from '@/types';

export default defineInterface(({ i18n }) => ({
	id: 'date-text',
	name: 'Date text',
	description: 'Date text input with validation',
	icon: 'today',
	component: InterfaceDateText,
	types: ['dateTime', 'date'],
	options: [
		/*{
			field: 'dateMode',
			name: 'Date mode',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'dropdown',
				options: {
					choices: [
						{ text: "(yy)yy-mm-dd", value: 'ymd' },
						{ text: "dd/mm/yy(yy)", value: 'dmy' },
						{ text: "mm/dd/yy(yy)", value: 'mdy' },
					],
				},
			},
			schema: {
				default_value: 'auto',
			},
		},*/
	],
	recommendedDisplays: ['datetime'],
	validator: async function (
		field: Field,
		value: string,
		itemEdits?: Record<string, string | number>,
		item?: Record<string, string | number>
	) {
		console.log('date-text - validate');
		if (!value || !value.length) return 'Empty date';
		let ts = Date.parse(value);
		if (isNaN(ts)) return 'Not a valid date';
	},
}));
