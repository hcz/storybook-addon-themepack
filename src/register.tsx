import * as React from 'react';
import addons, {types} from '@storybook/addons';

import {ADDON_ID} from './constants';
import {Theme} from './components/ThemePack';

addons.register(ADDON_ID, () => {
	addons.add(ADDON_ID, {
		title: 'Themes',
		type: types.TOOL,
		match: ({viewMode}) => viewMode === 'story',
		render: ({ key, active }) => {
			return (
				<Theme key={key} />
			);
		}
	});
});
