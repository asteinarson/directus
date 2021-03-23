import InterfaceTextInput from '../text-input/text-input.vue';
import { defineInterface } from '@/interfaces/define';
import { Field } from '@/types';

export default defineInterface(({ i18n }) => ({
	id: 'email',
	name: 'Email input',
	description: 'Validated email input',
	icon: 'text_fields',
	component: InterfaceTextInput,
	types: ['string', 'uuid'],
	validator: function (field: Field, value: string) {
		if (value) {
			let re_email = /^[a-z_\-]+@([a-z_\-]+\.)+([a-z_\-]+)$/;
			if (!value.match(re_email)) return 'Invalid email - must have @ and at least one dot after that';
		}
	},
	options: [
		{
			field: 'placeholder',
			name: i18n.t('placeholder'),
			meta: {
				width: 'half',
				interface: 'text-input',
				options: {
					placeholder: 'Email address',
				},
			},
		},
		{
			field: 'font',
			name: i18n.t('font'),
			type: 'string',
			meta: {
				width: 'half',
				interface: 'dropdown',
				options: {
					choices: [
						{ text: i18n.t('sans_serif'), value: 'sans-serif' },
						{ text: i18n.t('monospace'), value: 'monospace' },
						{ text: i18n.t('serif'), value: 'serif' },
					],
				},
			},
			schema: {
				default_value: 'sans-serif',
			},
		},
		{
			field: 'trim',
			name: i18n.t('interfaces.text-input.trim'),
			type: 'boolean',
			/*meta: {
				width: 'half',
				interface: 'toggle',
				options: {
					label: i18n.t('interfaces.text-input.trim_label'),
				},
			},*/
			schema: {
				default_value: true,
			},
		},
	],
}));
