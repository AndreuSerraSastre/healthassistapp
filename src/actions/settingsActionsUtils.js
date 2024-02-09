import { isArray, isObject } from "lodash";

export const formatChats = (data) => {
  if (!data) {
    return [];
  }
  if (isArray(data)) {
    return data.map((data) => ({
      ...data,
      label: `${data.description}`,
      value: data._id,
    }));
  }
  if (isObject(data)) {
    return {
      ...data,
      value: data._id,
      label: `${data.description}`,
    };
  }
};
export const formatUsers = (data) => {
  if (!data) {
    return [];
  }
  if (isArray(data)) {
    return data.map((data) => ({
      ...data,
      label: `${data.name} ${data.surname}`,
      value: data._id
    }));
  }
  if (isObject(data)) {
    return {
      ...data,
      value: data._id,
      label: `${data.name} ${data.surname}`
    };
  }
};

export const formatAlerts = (data) => {
  if (!data) {
    return [];
  }
  if (isArray(data)) {
    return data.map((data) => ({
      ...data,
      label: `${data.title}`,
      value: data._id,
    }));
  }
  if (isObject(data)) {
    return {
      ...data,
      value: data._id,
      label: `${data.title}`,
    };
  }
};
