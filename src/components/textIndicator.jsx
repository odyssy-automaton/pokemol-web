import { Box, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { ToolTipWrapper } from '../staticElements/wrappers';
import { numberWithCommas } from '../utils/general';
import TextBox from './TextBox';

const TextIndicator = ({
  type, value, label, fallback = '--', link, tooltip, tooltipText, size, comma,
}) => {
  const numberText = comma ? numberWithCommas(value) : value;
  return (
    <ToolTipWrapper link={link} tooltip={tooltip} tooltipText={tooltipText}>
      <Box mb={3}>
        <TextBox size={size === 'lg' ? 'sm' : 'xs'}>{label}</TextBox>
        <Skeleton isLoaded={value}>
          <TextBox size={size === 'lg' ? '3xl' : 'lg'} variant='value'>
            {numberText || fallback}
          </TextBox>
        </Skeleton>
      </Box>
    </ToolTipWrapper>
  );
};

export default TextIndicator;