export const boardSize = { EASY: 10, MEDIUM: 20, HARD: 30 };

export const levels=["EASY", "MEDIUM","HARD"];

export const difficulty_obj = n => ({
  EASY: Math.floor(n * n * 0.15),
  MEDIUM: Math.floor(n * n * 0.2),
  HARD: Math.floor(n * n * 0.2)
});

export const test_board = [
  [
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 2,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: -1,
      open: false,
      flagged: false,
      wrongFlagged: false
    }
  ],
  [
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: -1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 2,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 4,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: -1,
      open: false,
      flagged: false,
      wrongFlagged: false
    }
  ],
  [
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 2,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: -1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: -1,
      open: false,
      flagged: false,
      wrongFlagged: false
    }
  ],
  [
    {
      value: 0,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 0,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 2,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 3,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 3,
      open: false,
      flagged: false,
      wrongFlagged: false
    }
  ],
  [
    {
      value: 0,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 0,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: -1,
      open: false,
      flagged: false,
      wrongFlagged: false
    },
    {
      value: 1,
      open: false,
      flagged: false,
      wrongFlagged: false
    }
  ]
];
