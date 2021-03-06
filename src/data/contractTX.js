// TX = {
//   contract: String
//   poll: String (Optional)(Defaults to name)
//   name: String
//   display: String  (Optional)(Defaults to name)
//   errMsg: String
//   onTxHash: {}Strings
//   successMsg: String
// }

import { MINION_TYPES } from '../utils/proposalUtils';

export const CONTRACTS = {
  CURRENT_MOLOCH: {
    location: 'local',
    abiName: 'MOLOCH_V2',
    contractAddress: '.contextData.daoid',
  },
  SELECTED_MINION: {
    location: 'local',
    abiName: 'VANILLA_MINION',
    contractAddress: '.values.selectedMinion',
  },
  ERC_20: {
    location: 'local',
    abiName: 'ERC_20',
    contractAddress: '.values.tokenAddress',
  },
  ERC_721: {
    location: 'local',
    abiName: 'ERC_721',
    contractAddress: '.values.nftAddress',
  },
};

export const ACTIONS = {
  PROPOSAL: ['closeProposalModal', 'openTxModal'],
  BASIC: ['openTxModal'],
  GENERIC_MODAL: ['closeGenericModal', 'openTxModal'],
};

export const DETAILS = {
  STANDARD_PROPOSAL: {
    title: '.values.title',
    description: '.values.description',
    link: '.values.link.',
    proposalType: '.formData.type',
  },
  VANILLA_MINION_PROPOSAL: {
    title: '.values.title',
    description: '.values.description',
    proposalType: '.formData.type',
    minionType: MINION_TYPES.VANILLA,
  },
  PAYROLL_PROPOSAL: {
    title: '{minionName} sends a token',
    description:
      '{minionName} would like to send {tokenAmount} {tokenSymbol} to {recipient}',
    proposalType: '.formData.type',
    minionType: MINION_TYPES.VANILLA,
  },
  PAYROLL_PROPOSAL_TEMPORARY: {
    title: 'Minion sends a token',
    description: '.values.description',
    proposalType: '.formData.type',
    minionType: MINION_TYPES.VANILLA,
  },
};

export const TX = {
  SUBMIT_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'submitProposal',
    onTxHash: ACTIONS.PROPOSAL,
    poll: 'subgraph',
    display: 'Submit Proposal',
    errMsg: 'Error submitting proposal',
    successMsg: 'Proposal submitted!',
    gatherArgs: [
      '.values.applicant || .contextData.address',
      '.values.sharesRequested || 0',
      '.values.lootRequested || 0',
      '.values.tributeOffered || 0',
      '.values.tributeToken || .contextData.daoOverview.depositToken.tokenAddress',
      '.values.paymentRequested || 0',
      '.values.paymentToken || .contextData.daoOverview.depositToken.tokenAddress',
      { type: 'detailsToJSON', gatherFields: DETAILS.STANDARD_PROPOSAL },
    ],
    createDiscourse: true,
  },
  LOOT_GRAB_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'submitProposal',
    onTxHash: ACTIONS.PROPOSAL,
    poll: 'subgraph',
    display: 'Submit Loot Grab Proposal',
    errMsg: 'Error submitting proposal',
    successMsg: 'Loot Grab submitted!',
    gatherArgs: [
      '.contextData.address',
      0,
      '.values.lootRequested',
      '.values.tributeOffered',
      '.values.tributeToken',
      0,
      '.contextData.daoOverview.depositToken.tokenAddress',
      JSON.stringify({
        title: 'Loot Grab Proposal',
        description: 'Trade Tokens for Loot',
      }),
    ],
  },
  GUILDKICK_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'submitGuildKickProposal',
    poll: 'subgraph',
    onTxHash: ACTIONS.PROPOSAL,
    display: 'Submit GuildKick Proposal',
    errMsg: 'Error submitting proposal',
    successMsg: 'Guild Kick Proposal submitted!',
    createDiscourse: true,
    gatherArgs: [
      '.values.applicant',
      { type: 'detailsToJSON', gatherFields: DETAILS.STANDARD_PROPOSAL },
    ],
  },
  WHITELIST_TOKEN_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'submitWhitelistProposal',
    poll: 'subgraph',
    onTxHash: ACTIONS.PROPOSAL,
    display: 'Whitelist Token Proposal',
    errMsg: 'Error submitting proposal',
    successMsg: 'Token Proposal submitted!',
    createDiscourse: true,
    gatherArgs: [
      '.values.tokenAddress',
      { type: 'detailsToJSON', gatherFields: DETAILS.STANDARD_PROPOSAL },
    ],
  },
  UNLOCK_TOKEN: {
    contract: CONTRACTS.ERC_20,
    name: 'approve',
    specialPoll: 'unlockToken',
    onTxHash: null,
    display: 'Approve Spend Token',
    errMsg: 'Approve Token Failed',
    successMsg: 'Approved Token!',
  },
  MINION_PROPOSE_ACTION: {
    contract: CONTRACTS.SELECTED_MINION,
    name: 'proposeAction',
    poll: 'subgraph',
    onTxHash: ACTIONS.PROPOSAL,
    display: 'Propose Minion Action',
    errMsg: 'Error submitting action to minion',
    successMsg: 'Minion Proposal Created!',
    argsFromCallback: true,
    createDiscourse: true,
  },
  CANCEL_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'cancelProposal',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Cancel Proposal',
    errMsg: 'Error cancelling proposal',
    successMsg: 'Proposal Cancelled!',
  },
  SPONSOR_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'sponsorProposal',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Sponsor Proposal',
    errMsg: 'Error sponsoring proposal',
    successMsg: 'Proposal Sponsored!',
  },
  SUBMIT_VOTE: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'submitVote',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Submit Vote',
    errMsg: 'Error Submitting Vote',
    successMsg: 'Vote Submitted!',
  },
  PROCESS_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'processProposal',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Process Proposal',
    errMsg: 'Error Processing Proposal',
    successMsg: 'Proposal Processed!',
  },
  PROCESS_GK_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'processGuildKickProposal',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Process Proposal',
    errMsg: 'Error Processing Proposal',
    successMsg: 'Proposal Processed!',
  },
  PROCESS_WL_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'processWhitelistProposal',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Process Proposal',
    errMsg: 'Error Processing Proposal',
    successMsg: 'Proposal Processed!',
  },
  COLLECT_TOKENS: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'collectTokens',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Sync Token Balances',
    errMsg: 'Error Syncing Token Balances',
    successMsg: 'Token Balances Synced!',
  },
  UPDATE_DELEGATE: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'updateDelegateKey',
    poll: 'subgraph',
    onTxHash: ACTIONS.GENERIC_MODAL,
    display: 'Update Delegate Key',
    errMsg: 'Error Updating Delegate Key',
    successMsg: 'Delegate Key Updated!',
    gatherArgs: ['.values.delegateAddress'],
  },
  WITHDRAW: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'withdrawBalance',
    poll: 'subgraph',
    onTxHash: ACTIONS.BASIC,
    display: 'Withdraw Balance',
    errMsg: 'Error Withdrawing Balance',
    successMsg: 'Balance Withdrawn!',
  },
  RAGE_QUIT: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'ragequit',
    poll: 'subgraph',
    onTxHash: ACTIONS.GENERIC_MODAL,
    display: 'Rage Quit',
    errMsg: 'Error Rage Quitting',
    successMsg: 'Rage quit processed!',
  },
  PAYROLL: {
    contract: CONTRACTS.SELECTED_MINION,
    name: 'proposeAction',
    poll: 'subgraph',
    onTxHash: ACTIONS.PROPOSAL,
    display: 'Sending Token',
    errMsg: 'Error Submitting Proposal',
    successMsg: 'Proposal Submitted!',
    gatherArgs: [
      '.values.minionToken',
      0,
      {
        type: 'encodeHex',
        contract: CONTRACTS.ERC_20,
        fnName: 'transfer',
        gatherArgs: ['.values.applicant', '.values.minionPayment'],
      },
      {
        type: 'detailsToJSON',
        gatherFields: DETAILS.PAYROLL_PROPOSAL_TEMPORARY,
      },
    ],
  },
};
