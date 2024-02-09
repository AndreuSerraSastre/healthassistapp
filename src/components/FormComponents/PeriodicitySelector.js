import { Space, Form, InputNumber } from "antd";
import { isPlainObject } from "lodash";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FrequencySelector } from ".";
import { DashedDivision } from "../../styles";
import { JSONDebug, momentToDate } from "../../utils";
import {
  DAILY_FREQUENCY,
  daysOpts,
  DEFAULT_COUNT_FREQUENCY,
  DEFAULT_INTERVAL_FREQUENCY,
  monthsOpts,
  WEEKLY_FREQUENCY,
} from "./../../constants/periodicity";
import {
  DaysSelector,
  MonthsSelector,
  PeriodicityOptionsPanel,
  PeriodicitySelectorWrapper,
} from "./styles";
import { RuleInfo } from "./utils";

const PeriodicitySelector = ({ value, onChange, value2 }) => {
  const { date, rule, custom } = value || {};

  const [customPeriodicity, setCustomPeriodicity] = useState(custom || false);

  const onFrequencyChange = (freq) =>
    onChange({
      date,
      rule: { freq, dtstart: momentToDate(date) },
      custom: customPeriodicity,
    });

  const onDaysChange = (byweekday) =>
    onChange({
      date,
      rule: {
        ...rule,
        byweekday: byweekdaymap((week) => {
          return { weekday: week };
        }),
        dtstart: momentToDate(date),
      },
      custom: customPeriodicity,
    });

  const onMonthsChange = (bymonth) =>
    onChange({
      date,
      rule: { ...rule, bymonth, dtstart: momentToDate(date) },
      custom: customPeriodicity,
    });

  const onCountChange = (count) =>
    count &&
    onChange({
      date,
      rule: { ...rule, count, dtstart: momentToDate(date) },
      custom: customPeriodicity,
    });

  const onIntervalChange = (interval) =>
    interval &&
    onChange({
      date,
      rule: { ...rule, interval, dtstart: momentToDate(date) },
      custom: customPeriodicity,
    });

  const onCustomChange = (isCustom) => {
    setCustomPeriodicity(isCustom);
  };

  const handleChange = useCallback(() => {
    if (isPlainObject(rule)) {
      const output = {
        date,
        rule: {
          ...rule,
          dtstart: momentToDate(date),
        },
        custom: customPeriodicity,
      };
      onChange(output);
    }
    // eslint-disable-next-line
  }, [date, customPeriodicity]);

  useEffect(() => {
    if (value2) {
      setCustomPeriodicity(value2.custom);
    }
  }, [value2]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);

  return (
    <PeriodicitySelectorWrapper>
      <Fragment>
        <PeriodicityOptionsPanel>
          <FrequencySelector
            value={rulefreq != null ? rulefreq : DAILY_FREQUENCY}
            onChange={onFrequencyChange}
            isCustom={customPeriodicity}
            onCustomChange={onCustomChange}
          />

          {(rulefreq === WEEKLY_FREQUENCY || customPeriodicity) && (
            <DaysSelector
              options={daysOpts}
              onChange={onDaysChange}
              defaultValue={
                rulebyweekdaymap((byweekday) => {
                  return byweekday.weekday;
                }) || []
              }
            />
          )}

          {customPeriodicity && (
            <Fragment>
              <MonthsSelector
                options={monthsOpts}
                onChange={onMonthsChange}
                defaultValue={rulebymonth || []}
              />
              <Space>
                <Form.Item label="Cantidad">
                  <InputNumber
                    min={1}
                    type="number"
                    defaultValue={rulecount || DEFAULT_COUNT_FREQUENCY}
                    onChange={onCountChange}
                  />
                </Form.Item>
                <Form.Item label="Intervalo">
                  <InputNumber
                    min={1}
                    type="number"
                    defaultValue={rulecount || DEFAULT_INTERVAL_FREQUENCY}
                    onChange={onIntervalChange}
                  />
                </Form.Item>
              </Space>
            </Fragment>
          )}

          <DashedDivision />

          <RuleInfo rule={rule} showAlert />
        </PeriodicityOptionsPanel>

        <JSONDebug data={rule} />
      </Fragment>
    </PeriodicitySelectorWrapper>
  );
};

export default PeriodicitySelector;
