/** @jsx jsx */
import React, {FC} from 'react'
import {jsx, css} from '@emotion/core';
import styled from '@emotion/styled';

import {StorybookTheme} from './types';

const StyledBrandPreview = styled.div({
	display: 'inline-block',
	textAlign: 'center',
	border: '.2rem solid'
});

const StyledTextExample = styled.span<any>(({theme}: StorybookTheme) => ({
	fontSize: theme.typography.size.s2 - 1,
	padding: '0 .1rem',
}));

export const Preview: FC<StorybookTheme> = ({theme, style, children}) => (
	<StyledBrandPreview
		css={css`${theme}${style}`}
	>
		<StyledTextExample>
			{children || 'Aa'}
		</StyledTextExample>
	</StyledBrandPreview>
);
