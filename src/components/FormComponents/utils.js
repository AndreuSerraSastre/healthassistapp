import { memo } from "react";
import memoizee from "memoizee";
import { daysOpts } from "../../constants/periodicity";
import { reduce, truncate } from "lodash";
import { momentToDate } from "../../utils";
import { RRule } from "rrule";
import { Alert, Tag } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const spanishStrings = {
  every: "Cada",
  until: "hasta",
  day: "día",
  days: "días",
  week: "semana",
  weeks: "semanas",
  weekday: "día entre semana",
  year: "año",
  years: "años",
  month: "mes",
  months: "meses",
  on: "el",
  time: "vez",
  times: "veces",
  for: " ",
  in: "en",
  and: "y",
};

export const spanish = {
  dayNames: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
};

const ruleFormat = (rule) => {
  const byweekday =
    rulebyweekday &&
    reduce(
      rule.byweekday,
      (acc, current) => {
        acc.push(daysOpts[currentweekday]value);
        return acc;
      },
      []
    );
  const formatedRule = {
    ...rule,
    dtstart: momentToDate(rule.dtstart) || moment(),
    byweekday,
  };
  return formatedRule;
};

export const rruleFormater = memoizee(ruleFormat);

export const gettext = (id) => spanishStrings[id] || id;

export const RuleInfo = memo(({ rule, showAlert, showAsRawText }) => {
  if (!rule) {
    return null;
  }
  const formatedRule = rruleFormater(rule);
  const text = new RRule(formatedRule).toText(gettext, spanish);
  if (showAsRawText) {
    return text;
  }
  if (showAlert) {
    return <Alert icon={<InfoCircleOutlined />} showIcon message={text} />;
  }
  return (
    <Tag icon={<InfoCircleOutlined />}>
      {text
        ? truncate(text, {
          length: 20,
          separator: /,? +/,
        })
        : "..."}
    </Tag>
  );
});
