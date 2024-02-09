import { Storage } from '@capacitor/storage';
import { useEffect, useState } from "react";
import { groupBy, isArray, isPlainObject, mapValues, toPairs } from "lodash";
import { LoremIpsum } from "lorem-ipsum";
import moment from "moment";
import "moment/locale/es";

moment().locale("es");

// OBJECTS
export const nest = function (seq, keys) {
  if (!keys.length) return seq;
  var first = keys[0];
  var rest = keys.slice(1);
  return mapValues(groupBy(seq, first), function (value) {
    return nest(value, rest);
  });
};

export const PLATFORM = {
  IOS: "iOS",
  ANDROID: "Android",
  WINDOWSPHONE: "Windows Phone",
};

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
export const getMobileOperatingSystem = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return PLATFORM.WINDOWSPHONE;
  }

  if (/android/i.test(userAgent)) {
    return PLATFORM.ANDROID;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return PLATFORM.IOS;
  }

  return "unknown";
};

// MATH
export const percentOf = (num1, num2) =>
  Math.round((num1 / num2) * 100 * 10) / 10;

export const taskPercent = (start, end) => {
  var now = moment();
  start = moment(start, "YYYY-MM-DD") || moment(now).startOf("day");
  end = moment(end) || moment(now).endOf("day");
  var totalMillisInRange = end.valueOf() - start.valueOf();
  var elapsedMillis = now.valueOf() - start.valueOf();
  return Math.round(Math.min(100, 100 * (elapsedMillis / totalMillisInRange)));
};

// DATES
export const dateFormatter = (date) => {
  return moment(date).format("L");
};

export const randomDate = (start, end) => {
  var d = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join("/");
};

export const dateObjFormatter = (date, separator = "/") => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join(separator);
};

export const momentToDate = (date) => {
  if (!date) {
    return new Date();
  }
  return new Date(date);
};

// FILES
export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const bytesToSize = (bytes) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

export const blobToFile = (theBlob, fileName) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};

// DEVICE
export const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  return width <= 1200;
};

// FORM
const handleInitDataTypes = (data) => {
  if (!data) return;

  if (isPlainObject(data) && data.id) {
    return data.id;
  }
  if (isPlainObject(data) && !data.id) {
    return data;
  }
  if (isArray(data)) {
    return data;
  }
  return data;
};

export const formatFormInitialData = (data) => {
  const fields = toPairs(data).reduce((flds, a) => {
    flds.push({ name: a[0], value: handleInitDataTypes(a[1]) });
    return flds;
  }, []);
  return fields;
};

// MOCK
export const mockedText = (textLenght = 1) => {
  const text = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  return text.generateSentences(textLenght);
};

// COOKIES
export const setCookie = async (key, value, exdays) => {
  await Storage.set({ key, value: JSON.stringify(value) });
};

export const getCookie = async (key) => {
  const c = await Storage.get({ key: key });
  return JSON.parse(c.value);
};

export const deleteCookie = async (key) => {
  await Storage.remove({ key });
};

export const getCurrentChanges = (
  change,
  changes,
  data,
  setdisabled,
  profile
) => {
  const entrie = Object.entries(change)[0][0];
  const previous = changes.filter((x) => Object.entries(x)[0][0] !== entrie);
  const postChanges = previous;
  if (data && data[entrie] !== Object.entries(change)[0][1]) {
    setdisabled(true);
    const placeholder = document.getElementById(
      Object.entries(change)[0][0]
    ).placeholder;
    postChanges.push({
      ...change,
      placeholder,
      date: moment(),
      user: profile._id,
    });
  }
  return postChanges;
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
