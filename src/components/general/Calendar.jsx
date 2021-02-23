import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { grayColor, lighterGrayColor, secondaryColor } from '../../constants/websiteColors';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import { Heading4 } from './Headings';

const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  & > *:first-child {
    margin-bottom: 32px;
  }
`;

const MonthWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChangeMonthButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const DatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  & > *:first-child {
    margin-bottom: 16px;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 32px;
  grid-gap: 8px;
  & > :first-child {
    grid-column-start: ${(props) => props.dayOfWeekOfMonthBeginning};
  }
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${(props) => props.active && secondaryColor};
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    background-color: ${(props) => props.selectable && secondaryColor};
  }
  /* Making the date unselectable if it cant be selected */
  & > * {
    color: ${(props) => !props.selectable && grayColor};
    cursor: ${(props) => !props.selectable && 'default'};
  }
`;

function Calendar({ date, setDate, allDates }) {
  const { t, i18n } = useTranslation();

  // Function returns a date object with given date and time equal to 00:00:00 in UTC
  // Example: makeZeroHourDate(2021,01,01).toISOString() => '2021-01-01T00:00:00Z'
  const makeZeroHourDate = (year, month, day) => new Date(Date.UTC(year, month, day));

  // Date selection handler
  const handleDateChange = (year, month, day) => {
    setDate(makeZeroHourDate(year, month, day));
  };

  // Previous month selection handler
  const handleMonthBack = () => {
    handleDateChange(date.getUTCFullYear(), date.getUTCMonth() - 1, date.getUTCDate());
  };

  // Next month selection handler
  const handleMonthForward = () => {
    handleDateChange(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
  };

  // Indicates which day of week is the beginning of the month (Used for first row grid offset)
  // Starts with 0: Sunday, 1: Monday... and the default grid-column start is 1
  const dayOfWeekOfMonthBeginning = makeZeroHourDate(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    1,
  ).getUTCDay();

  // Indicates how many days are in the current month
  // We make a date with the next month, but by setting the date to 0
  // we get the last day of the previous (current) month
  const daysInCurrentMonth = makeZeroHourDate(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    0,
  ).getUTCDate();

  // Constructing day selectors
  const days = [];
  for (let i = 1; i <= daysInCurrentMonth; i += 1) {
    // Indicates whether a date is selectable
    // It is if it is later in this month
    // or has a later month
    // or has a later year
    // or the mode is allDdates
    const selectable =
      i >= new Date().getUTCDate() ||
      date.getUTCMonth() > new Date().getUTCMonth() ||
      date.getUTCFullYear() > new Date().getUTCFullYear() ||
      allDates;

    const active = i === date.getUTCDate();

    // If the date cannot be selected, but is active, we reset the date to today
    // This can happen if the user goes forward a month, selects an earlier date and goes back
    if (!selectable && active) {
      setDate(new Date());
      break;
    }

    days[i] = (
      <Day
        key={i}
        selectable={selectable}
        active={active}
        onClick={
          selectable ? () => handleDateChange(date.getUTCFullYear(), date.getUTCMonth(), i) : null
        }
      >
        <Heading4>{i}</Heading4>
      </Day>
    );
  }

  return (
    <CalendarContainer>
      <MonthWrap>
        <ChangeMonthButton
          onClick={
            // If the current date is at least a month ahead of today
            // or the component is rendered with all dates available, the button works
            date.getUTCMonth() - 1 >= new Date().getUTCMonth() ||
            date.getUTCFullYear() > new Date().getUTCFullYear() ||
            allDates
              ? handleMonthBack
              : null
          }
        >
          <ArrowLeft height={24} color={lighterGrayColor} />
        </ChangeMonthButton>
        <Heading4>
          {date.toLocaleString(i18n.language, { year: 'numeric', month: 'long' })}
        </Heading4>
        <ChangeMonthButton onClick={handleMonthForward}>
          <ArrowRight height={24} color={lighterGrayColor} />
        </ChangeMonthButton>
      </MonthWrap>
      <DatePicker>
        <WeekDays>
          <Heading4 color={secondaryColor}>{t('Mo')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Tu')}</Heading4>
          <Heading4 color={secondaryColor}>{t('We')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Th')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Fr')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Sa')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Su')}</Heading4>
        </WeekDays>
        <Days dayOfWeekOfMonthBeginning={dayOfWeekOfMonthBeginning}>{days}</Days>
      </DatePicker>
    </CalendarContainer>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
  allDates: PropTypes.bool,
};

Calendar.defaultProps = {
  allDates: false,
};

export default Calendar;
