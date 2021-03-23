<template>
	<v-hover v-slot="{ hover }">
		<v-input
			:value="value"
			placeholder="Enter date"
			:disabled="disabled"
			trim="true"
			type="text"
			class="sans-serif"
			@input="$listeners.input"
		></v-input>
		<p v-if="hover">{{ hover_date }}</p>
	</v-hover>
</template>

<script lang="ts">
import { defineComponent, watchEffect, computed } from '@vue/composition-api';
//import { formatISO, parseISO, format, parse } from 'date-fns';

export default defineComponent({
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			default: null,
		},
	},
	setup(props) {
		const hover_date = computed(() => {
			const ts = Date.parse(props.value);
			if (isNaN(ts)) return '<not a valid date>';
			return new Date(props.value).toDateString();
		});
		watchEffect(() => console.log(props.value));
		return {
			hover_date,
		};
	},
});
</script>

<style lang="scss" scoped>
.v-button.red {
	--v-button-color: var(--red);
}
.v-button.blue {
	--v-button-color: var(--blue);
}
</style>
