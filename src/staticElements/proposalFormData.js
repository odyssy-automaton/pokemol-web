import { PROPOSAL_TYPES } from '../utils/proposalUtils';

const INFO_TEXT = {
  SHARES_REQUEST:
    'Shares provide voting power and exposure to assets. Whole numbers only please.',
  LOOT_REQUEST:
    'Loot provides exposure to assets but not voting power. Only whole numbers accepted here, no decimals plz',
  APPLICANT:
    'Address to receive the Shares, Loot, and/or Funding requested in this proposal.',
  TOKEN_TRIBUTE:
    'Only tokens approved by the DAO are allowed here. Members can add more approved tokens with Token proposals',
  PAYMENT_REQUEST: 'Request Funds from the DAO',
};

export const FIELD = {
  TITLE: {
    type: 'input',
    label: 'Title',
    name: 'title',
    htmlFor: 'title',
    placeholder: 'Proposal Title',
  },
  DESCRIPTION: {
    type: 'textarea',
    label: 'Description',
    name: 'description',
    htmlFor: 'description',
    placeholder: 'How does that make you feel, champ',
  },
  SHARES_REQUEST: {
    type: 'input',
    label: 'shares requested',
    name: 'shares',
    htmlFor: 'shares',
    placeholder: '0',
    info: INFO_TEXT.SHARES_REQUEST,
  },
  LINK: {
    type: 'linkInput',
    label: 'Link',
    name: 'link',
    htmlFor: 'link',
    placeholder: 'daolink.club',
  },
};

export const PROPOSAL_FORMS = {
  MEMBER: {
    type: PROPOSAL_TYPES.MEMBER,
    tx: {
      poll: 'submitProposal',
      service: 'moloch',
      action: 'submitProposal',
    },
    fields: [
      FIELD.TITLE,
      FIELD.SHARES_REQUEST,
      FIELD.DESCRIPTION,
      {
        type: 'inputSelect',
        selectLabel: 'Tests',
        label: 'Sample Input Select',
        name: 'generic-input-select',
        htmlFor: 'generic-input-select',
        options: [
          { name: 'Test 1', value: 'test 1' },
          { name: 'Test 2', value: 'test 2' },
          { name: 'Test 3', value: 'test 3' },
        ],
      },
      FIELD.LINK,
    ],
    additionalOptions: [FIELD.TITLE, FIELD.SHARES_REQUEST],
  },
};