<template>
	<value-null v-if="!relatedCollection" />
	<span v-else-if="['o2m', 'm2m', 'm2a', 'translations'].includes(type.toLowerCase())">
		{{ formatItem(value) }}
	</span>
	<render-template v-else :template="_template" :item="value" :collection="relatedCollection" />
</template>

<script lang="ts">
import { defineComponent, computed, PropType, Ref } from '@vue/composition-api';
import getRelatedCollection from '@/utils/get-related-collection';
import useCollection from '@/composables/use-collection';
import ValueNull from '@/views/private/components/value-null';

const cnt = 0;

export default defineComponent({
	components: { ValueNull },
	props: {
		collection: {
			type: String,
			required: true,
		},
		field: {
			type: String,
			required: true,
		},
		value: {
			type: [Array, Object] as PropType<any | any[]>,
			default: null,
		},
		template: {
			type: String,
			default: null,
		},
		type: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const relatedCollection = computed(() => {
			return getRelatedCollection(props.collection, props.field);
		});

		const primaryKeyField = computed(() => {
			if (relatedCollection.value !== null) {
				return useCollection(relatedCollection as Ref<string>).primaryKeyField.value;
			}
		});

		const _template = computed(() => {
			return props.template || `{{ ${primaryKeyField.value!.field} }}`;
		});

		const formatItem = function (item: Record<string, any>[]) {
			const pk_field = primaryKeyField.value?.field;
			const sa: string[] = [];
			for (const v of item) {
				for (const k of Object.keys(v)) {
					if (k != pk_field) {
						const vi = v[k];
						if (typeof vi == 'object') {
							sa.push(Object.values(vi).toString());
						} else {
							sa.push(vi.toString());
						}
					}
				}
			}
			return sa.join(', ');
		};

		return { relatedCollection, primaryKeyField, _template, formatItem };
	},
});
</script>
