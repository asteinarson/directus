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

			function arrayToLookup(a: any[], idField: string) {
				let lut: Record<number, any> = {};
				for (let v of a) {
					if (typeof v == 'object' && v[idField]) lut[v[idField]] = v;
				}
				return lut;
			}
			// Structure itemEdits so that we can directly access any new value in it
			let manyById = arrayToLookup(response.data.data, 'id');
			console.log('manyById: ', manyById);
			let manyChangesById = itemEdits ? arrayToLookup(itemEdits[field.field], 'id') : {};
			console.log('manyChangesById: ', manyChangesById);

			const get_w_fallback = (id: number, field: string) => {
				let old = manyById[id];
				let ne_w = manyChangesById[id];
				if (ne_w && ne_w[field] != undefined) return ne_w[field];
				if (old && old[field] != undefined) return old[field];
			};

			// Now do the calculation
			let sum = 0.0;
			for (let id of ids) {
				let cr = get_w_fallback(id, crCol);
				let db = get_w_fallback(id, debCol);
				console.log(`id:${id} cr:${cr} db:${db}`);
				sum += get_w_fallback(id, crCol) - get_w_fallback(id, debCol);
			}
			console.log('sum: ' + sum.toString());
			if (sum != 0.0) {
				console.log('sum!=0.0');
				return 'Credit/debet difference of: ' + sum.toString();
			}
		}
	},
}));
