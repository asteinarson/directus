import { defineInterface } from '../define';
import InterfaceOneToMany from '../one-to-many/one-to-many.vue';
import Options from '../one-to-many/options.vue';

export default defineInterface(({ i18n }) => ({
	id: 'one-to-many-credeb',
	name: 'One to many - credit-debit',
	description: 'With sum validation on sum of credit and debit columns',
	icon: 'arrow_right_alt',
	component: InterfaceOneToMany,
	types: ['alias'],
	groups: ['o2m'],
	relational: true,
	options: Options,
	recommendedDisplays: ['related-values'],
	validator: function (
		value: string,
		itemEdits?: Record<string, string | number>,
		item?: Record<string, string | number>
	) {
		console.log('m2o-credeb - validator', value, Object.entries(itemEdits as Object), Object.entries(item as Object));
	},
}));
