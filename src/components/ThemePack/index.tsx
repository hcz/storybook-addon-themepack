/** @jsx jsx */
import React from 'react';
import {jsx} from '@emotion/core';
import {TooltipLinkList, WithTooltip} from '@storybook/components';
import {useAddonState, useParameter} from '@storybook/api';

import {StyledButton, StyledIcon, StyledLabel} from './styled';
import {Preview} from '../Preview';
import {ADDON_ID, PARAM_KEY} from '../../constants';
import {updateIframe, isLocalFile} from '../../utils';

export const Theme: React.FC = () => {
	if (isLocalFile()) {
		return null;
	}

	const {
		preloadedState,
		pack,
		styles = {},
		icon = 'mirror',
		labelForClear = '-',
		usePreview = true,
		sortFunction
	} = useParameter<any>(PARAM_KEY, {});

	React.useLayoutEffect(() => {
		if (styles && styles.iframe) {
			updateIframe('iframe', styles.iframe);
		}
	}, [styles]);

	const [state, setState] = useAddonState<Record<string, any>>(ADDON_ID, {pristine: true});

	const categories = typeof sortFunction === 'function'
		? pack && Object.keys(pack).sort(sortFunction)
		: pack && Object.keys(pack);

	return (
		<React.Fragment>
			{
				categories && categories.map((category, categoryNumber) => {
					const selected = state[category];
					if (!pack[category]) {
						return null;
					}

					const [name, ...config] = pack[category];

					let preloadedCSS = undefined;
					const preloadedItemLabel = preloadedState ? preloadedState[category] : '';

					const tooltipContent = config
						.reduce((accumulator: any, {options, condition}: any = {}) => {
							options.map(({css, label}: any) => {
								if (typeof condition === 'function' && !condition(state)) {
									return accumulator;
								}

								if (css && label) {
									accumulator.push({
										id: label,
										title: label,
										active: state[category] === label,
										right: usePreview && (<Preview theme={css} style={styles && styles.preview}/>),
										onClick: () => {
											setState((state) => ({
												...state,
												[category]: label
											}));
											updateIframe(category, css);
										}
									});

									if (label === preloadedItemLabel) {
										preloadedCSS = css;
									}
								}
							});
							return accumulator;
						}, [])
						.concat({
							id: 'None',
							title: labelForClear,
							onClick: () => {
								setState((state) => ({
									...state,
									[category]: undefined
								}));
								updateIframe(category, '');
							}
						});

					const isInTooltip = tooltipContent.some(({title}: any) => title === state[category]);

					// Select preloaded state item
					if (state.pristine && preloadedItemLabel && preloadedCSS) {
						setState((state) => ({
							...state,
							pristine: false,
							[category]: preloadedItemLabel
						}));
						updateIframe(category, preloadedCSS);
					} else if (!isInTooltip && state[category]) {
						// Remove items that was previously selected but disappeared
						setState((state) => ({
							...state,
							[category]: undefined
						}));
						updateIframe(category, '');
					}

					return tooltipContent.length > 1 ? (
						<WithTooltip
							key={category}
							placement='top'
							trigger='click'
							tooltip={<TooltipLinkList links={tooltipContent}/>}
							closeOnClick
						>
							<StyledButton
								active={selected}
							>
								{categoryNumber === 0 && icon && <StyledIcon icon={icon}/>}
								<StyledLabel>
									{selected || name}
								</StyledLabel>
							</StyledButton>
						</WithTooltip>
					) : null
				})
			}
		</React.Fragment>
	)
}
