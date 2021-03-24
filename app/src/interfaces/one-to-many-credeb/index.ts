import { defineInterface } from '../define';
import InterfaceOneToMany from '../one-to-many/one-to-many.vue';
import Options from '../one-to-many/options.vue';
import { Field, Relation } from '@/types';
import { useRelationsStore } from '@/stores';
import api from '@/api';

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
	validator: async function (field: Field, value: string, itemEdits?: Record<string, any>, item?: Record<string, any>) {
		console.log('m2o-credeb - validator');
		console.log('value: ' + typeof value);
		console.log(value);
		console.log('itemEdits: ' + typeof itemEdits);
		console.log(itemEdits);
		console.log('item: ' + typeof item);
		console.log(item);
		if (item) {
			// We must first get previous credit/debet for the included rows
			const field_rel: Relation = useRelationsStore().getRelationsForField(field.collection, field.field)[0];
			let crCol = 'credit',
				debCol = 'debit';
			let ids: number[] = item[field.field] as number[];
			let qs =
				'?filter[id][_in]=' +
				ids.reduce((a, v) => (a ? a + ',' : a) + v.toString(), '') +
				`&fields=id,${crCol},${debCol}`;
			console.log(`Querying ${field_rel.many_collection}: ${qs}`);
			const response = await api.get('/items/' + field_rel.many_collection + qs);
			console.log(response.data);

			// Structure itemEdits so that we can directly access any new value in it
			let changes: Record<number, Record<string, any>> = {};
			let edits: (number | Record<string, any>)[] = item[field.field];
			for (let ix in edits) {
				let v = edits[ix];
				if (typeof v == 'object') {
					changes[v.id] = v;
				}
			}
			console.log('changes: ', changes);

			const get_w_fallback = (id: number, field: string) => {
				changes[id] && changes[id][field] ? changes[id][field] : response.data;
			};
			// Now do the calculation
			let sum = 0.0;
			for (let o of response.data) {
				let id = o.id;
			}
		}
	},
}));
