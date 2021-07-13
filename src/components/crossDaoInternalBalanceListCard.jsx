import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Flex, Box, Skeleton, Icon, Button, Tooltip } from '@chakra-ui/react';
import { RiLoginBoxLine } from 'react-icons/ri';

import { useTX } from '../contexts/TXContext';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import MinionInternalBalanceActionMenu from './minionInternalBalanceActionMenu';
import { daoConnectedAndSameChain, numberWithCommas } from '../utils/general';
import { chainByName } from '../utils/chain';
import { TX } from '../data/contractTX';

const CrossDaoInternalBalanceListCard = ({ token, currentDaoTokens }) => {
  const { minion, daochain } = useParams();
  const { address, injectedChain } = useInjectedProvider();

  // TODO: maybe make 2 different components for in/outside daos
  const { submitTransaction } = daochain
    ? useTX()
    : { submitTransaction: null };
  const [tokenWhitelisted, setTokenWhitelisted] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const isWhitelisted =
      currentDaoTokens &&
      currentDaoTokens.find(daoToken => {
        return (
          token.token.tokenAddress.toLowerCase() ===
          daoToken.tokenAddress.toLowerCase()
        );
      });
    setTokenWhitelisted(!isWhitelisted);
  }, [currentDaoTokens]);

  const handleWithdraw = async options => {
    setLoading(true);
    await submitTransaction({
      tx: TX.MINION_WITHDRAW,
      args: [
        token.moloch.id,
        token.token.tokenAddress,
        token.tokenBalance,
        options.transfer,
      ],
      localData: {
        minionAddress: minion,
      },
    });

    // TODO: handle the after effects - refresh dao
    setLoading(false);
  };

  return (
    <Flex h='60px' align='center'>
      <Box w='30%' d={['none', null, null, 'inline-block']}>
        <Flex align='center'>
          <Box fontFamily='mono'>{token.meta?.name}</Box>
        </Flex>
      </Box>
      <Box w='15%' d={['none', null, null, 'inline-block']}>
        <Flex align='center'>
          <Box fontFamily='mono'>
            {chainByName(token.meta?.network).short_name}
          </Box>
        </Flex>
      </Box>
      <Box w='20%' d={['none', null, null, 'inline-block']}>
        <Flex align='center'>
          <Box fontFamily='mono'>{token.token.symbol}</Box>
        </Flex>
      </Box>

      <Box w={['25%', null, null, '25%']}>
        <Skeleton isLoaded={token.tokenBalance}>
          <Box fontFamily='mono'>
            {token.tokenBalance ? (
              <>
                {`${numberWithCommas(
                  parseFloat(
                    +token.tokenBalance / 10 ** +token.token.decimals,
                  ).toFixed(4),
                )} ${token.token.symbol}`}
              </>
            ) : null}
          </Box>
        </Skeleton>
      </Box>

      <Box w={['35%', null, null, '35%']} d='inline-block'>
        {!minion ? (
          <Link
            to={`/dao/${chainByName(token.meta?.network).chain_id}/${
              token.moloch.id
            }/profile/${address}`}
          >
            Withdraw
            <Icon
              as={RiLoginBoxLine}
              ml={3}
              color='secondary.500'
              h='15px'
              w='15px'
            />
          </Link>
        ) : (
          <Box textAlign='right'>
            <MinionInternalBalanceActionMenu
              targetDao={token}
              tokenWhitelisted={tokenWhitelisted}
              handleWithdraw={handleWithdraw}
              loading={loading}
              daoConnectedAndSameChain={
                !daoConnectedAndSameChain(
                  address,
                  daochain,
                  injectedChain?.chainId,
                )
              }
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default CrossDaoInternalBalanceListCard;