import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormLabel,
  FormControl,
  Flex,
  Input,
  Icon,
  Box,
} from '@chakra-ui/react';
// import { utils } from 'web3';
import { RiErrorWarningLine } from 'react-icons/ri';

// import {
//   useDao,
//   useTxProcessor,
//   useUser,
//   useModals,
// } from '../../../contexts/PokemolContext';
import TextBox from '../components/TextBox';

import TributeInput from './tributeInput';
import DetailsFields from './detailFields';
import { detailsToJSON } from '../utils/general';
import { useOverlay } from '../contexts/OverlayContext';

const StakeProposalForm = () => {
  const [loading, setLoading] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const { setD2dProposalModal } = useOverlay();

  const { handleSubmit, errors, register, setValue, getValues } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const newE = Object.keys(errors)[0];
      setCurrentError({
        field: newE,
        ...errors[newE],
      });
    } else {
      setCurrentError(null);
    }
  }, [errors]);

  const onSubmit = async (values) => {
    setLoading(true);

    const details = detailsToJSON(values);
    console.log(details);

    // address targetDao,
    // address actionTo,
    // address token,
    // uint256 actionValue,
    // bytes calldata actionData,
    // string calldata details
    // try {
    //   dao.daoService.moloch.submitProposal(
    //     values.sharesRequested ? values.sharesRequested?.toString() : '0',
    //     values.lootRequested ? values.lootRequested?.toString() : '0',
    //     values.tributeOffered
    //       ? utils.toWei(values.tributeOffered?.toString())
    //       : '0',
    //     values.tributeToken || dao.graphData.depositToken.tokenAddress,
    //     values.paymentRequested
    //       ? utils.toWei(values.paymentRequested?.toString())
    //       : '0',
    //     values.paymentToken || dao.graphData.depositToken.tokenAddress,
    //     details,
    //     values?.applicantHidden?.startsWith('0x')
    //       ? values.applicantHidden
    //       : values?.applicant
    //       ? values.applicant
    //       : user.username,
    //     txCallBack,
    //   );
    // } catch (err) {
    //   setLoading(false);
    //   console.log('error: ', err);
    // }
    setD2dProposalModal((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={errors.name}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        mb={5}
        flexWrap='wrap'
      >
        <Box w={['100%', null, '50%']} pr={[0, null, 5]}>
          <DetailsFields register={register} />
        </Box>
        <Box w={['100%', null, '50%']}>
          <TextBox as={FormLabel} size='xs' htmlFor='name' mb={2}>
            Shares Requested
          </TextBox>
          <Input
            name='sharesRequested'
            placeholder='0'
            mb={5}
            ref={register({
              required: {
                value: true,
                message: 'Requested shares are required for Member Proposals',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Requested shares must be a number',
              },
            })}
            color='white'
            focusBorderColor='secondary.500'
          />
          <TributeInput
            register={register}
            setValue={setValue}
            getValues={getValues}
            setError={setCurrentError}
          />
        </Box>
      </FormControl>
      <Flex justify='flex-end' align='center' h='60px'>
        {currentError && (
          <Box color='secondary.300' fontSize='m' mr={5}>
            <Icon as={RiErrorWarningLine} color='secondary.300' mr={2} />
            {currentError.message}
          </Box>
        )}
        <Box>
          <Button
            type='submit'
            loadingText='Submitting'
            isLoading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default StakeProposalForm;
