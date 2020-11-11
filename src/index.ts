import {Condition, PackedThemePart, PackOptions} from './types';

/**
 * Creates pack with conditional rendering for themepack option
 */
export function pack<S extends string>(options: PackOptions, condition?: Condition<S>): PackedThemePart<S> | undefined {
	const pack: PackedThemePart<S> = {
		options: []
	};

	if (Array.isArray(options)) {
		pack.options = options;
	} else if (options) {
		pack.options = Object.keys(options).map((label) => ({
			css: options[label],
			label
		}))
	} else {
		return undefined;
	}

	if (typeof(condition) === 'function') {
		pack.condition = condition;
	}

	return pack;
}

export * from './types';
