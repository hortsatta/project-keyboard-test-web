import { TestMode } from '../models/wpm-test.model';

export const timeSecondAmountList = [15, 30, 60, 90, 120];

export const wordAmountList = [25, 50, 100, 200, 300];

export const DEFAULT_TEST_SYSTEM_OPTIONS = {
  typeTwiceToStart: false,
  comboMultiplierAutoActivate: true,
  comboBackdropColorSync: true,
  perfectWordSfx: false,
  notCorrectWordSfx: false,
  comboMultiplierSfx: false,
};

export const DEFAULT_TEST_MODE_OPTIONS = {
  [TestMode.Time]: {
    mode: TestMode.Time,
    timeWordAmount: timeSecondAmountList[1],
  },
  [TestMode.Word]: {
    mode: TestMode.Word,
    timeWordAmount: wordAmountList[1],
  },
  [TestMode.Zen]: {
    mode: TestMode.Zen,
    timeWordAmount: 0,
  },
};

export const COMBO_COUNTER_EXPIRE_MS = 4000;

export const DEFAULT_COMBO_COUNTER = {
  count: 0,
  highestCounts: [],
};

export const DEFAULT_COMBO_MULTIPLIER = {
  active: false,
  stock: 0,
  currentCount: 0,
};

export const INC_STOCK_COMBO_MULTIPLIER = 0.5;
export const MAX_STOCK_COMBO_MULTIPLIER = 3;
export const MIN_ACTIVE_STOCK_COMBO_MULTIPLIER = 1;
export const STOCK_COMBO_MULTIPLIER_SEC = 6;
export const MAX_CHAR_ON_PERFECT_SCORE = 5;

const MAX_CHAR_PER_ROW = 72;
const MIN_ROW_COUNT = 5;

export const MIN_CHAR_COUNT = MAX_CHAR_PER_ROW * MIN_ROW_COUNT;
