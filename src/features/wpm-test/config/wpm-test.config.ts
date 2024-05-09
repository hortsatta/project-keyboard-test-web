import { TestMode } from '../models/wpm-test.model';

export const timeSecondAmountList = [15, 30, 60, 120, 180];

export const wordAmountList = [25, 50, 100, 200, 300];

export const DEFAULT_TEST_SYSTEM_OPTIONS = {
  comboBackdropColorSync: true,
  perfectWordSfx: false,
  notCorrectWordSfx: false,
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

export const DEFAULT_COMBO_COUNTER = {
  count: 0,
  highestCount: 0,
};

const MAX_CHAR_PER_ROW = 72;
const MIN_ROW_COUNT = 5;

export const MIN_CHAR_COUNT = MAX_CHAR_PER_ROW * MIN_ROW_COUNT;
