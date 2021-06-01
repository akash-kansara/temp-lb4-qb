module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:      A new feature'
    },
    {
      value: 'fix',
      name: 'fix:       A bug fix'
    },
    {
      value: 'docs',
      name: 'docs:      Documentation only changes'
    },
    {
      value: 'style',
      name: 'style:     Changes due to lint configuration',
    },
    {
      value: 'refactor',
      name: 'refactor:  A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:      A code change that improves performance',
    },
    {
      value: 'test',
      name: 'test:      Adding missing tests',
    },
    {
      value: 'chore',
      name: 'chore:     Changes to the build process or auxiliary tools',
    },
    {
      value: 'revert',
      name: 'revert:    Revert to a commit',
    },
    {
      value: 'WIP',
      name: 'WIP:       Work in progress',
    },
  ],

  scopes: [
    {name: 'ci-cd'},
    {name: 'core'},
  ],

  appendBranchNameToCommitMessage: false,
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'Fixes - ',

  messages: {
    type: `Select the type of change that you're committing:`,
    scope: 'Denote the SCOPE of this change:',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use `|` to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #1, #2',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
  breaklineChar: '|',
  footerPrefix: '',
  askForBreakingChangeFirst: true,
};
