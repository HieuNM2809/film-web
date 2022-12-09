import * as moment from 'moment';
import 'moment/locale/vi';
import format from 'date-fns/format';
import { isToday } from 'date-fns';

export const replaceStringBy = (str_origin, str_needToReplace, str_by) => {
  const regex = new RegExp(`${str_needToReplace}`, 'g');

  let result = str_origin.replace(regex, `${str_by}`);
  return result;
};

export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = (cname) => {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const currentDate = () => {
  return new Date();
};

export const FORMAT_DATETIME = 'DD/MM/YYYY HH:mm';

export const FORMAT_DATE = 'DD/MM/YYYY';

export const formatRelativeTime = (currentDate) => {
  return currentDate ? moment(currentDate).from(moment()) : null;
};

export const formatDateTime = (date) => {
  return date ? moment(date).format(FORMAT_DATETIME) : null;
};

export const formatDate = (date) => {
  return date ? moment(date).format(FORMAT_DATE) : null;
};

export const checkToday = (dateCheck) => {
  return dateCheck
    ? moment(dateCheck).format(FORMAT_DATE) ===
    moment(currentDate()).format(FORMAT_DATE)
    : false;
};

export const convertArrayToObject = (data, key) => {
  if (!key || !data[0][key]) return {};
  return data.reduce(
    (result, item) => ({ ...result, [item[key]]: { ...item } }),
    {}
  );
};

export const findValueInArrayeBy = (list = [], key, value) => {
  const currentIndex = list.findIndex((item) => item[key] === value);
  if (currentIndex < 0) return '';
  return list[currentIndex];
};

export const formatCurrencyVnd = (value) => {
  return (
    `${value}`
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      }) + 'đ'
  );
};
export const formatInterviewDate = (raw) => {
  return `${getDayOfWeek(raw)} ${format(raw, 'd/M/yyyy')}`;
};

export const formatInterviewTime = (raw) => {
  return format(raw, 'HH:mm');
};

export const formatInterviewDateTime = (raw) => {
  return `${getDayOfWeek(raw)} ${format(raw, 'd')} Tháng ${format(
    raw,
    'M'
  )} vào ${format(raw, 'HH:mm')}`;
};

export const getDayOfWeek = (date) => {
  const day = format(date, 'E');

  switch (day) {
    case 'Mon':
      return 'T2';
    case 'Tue':
      return 'T3';
    case 'Wed':
      return 'T4';
    case 'Thu':
      return 'T5';
    case 'Fri':
      return 'T6';
    case 'Sat':
      return 'T7';
    default:
      return 'CN';
  }
};
export const formatChatDateTime = (raw) => {
  if (isToday(raw)) {
    return format(raw, 'HH:mm');
  }

  return `${getDayOfWeek(raw)} ${format(raw, 'HH:mm d')} Tháng ${format(
    raw,
    'M, y'
  )}`;
};

export const formatExperience = (min, max) => {
  if (min) {
    if (max) {
      return `${min} - ${max} năm KN`;
    }
    return `0 - ${min} năm KN`;
  } else {
    if (max) {
      return `0 - ${max} năm KN`;
    }
  }
  return `Không yêu cầu kinh nghiệm`;
};

export const formatSalary = (min, max) => {
  if (min) {
    if (max) {
      return `${min} - ${max} triệu VNĐ`;
    }
    return `Lên đến ${min} triệu VNĐ`;
  } else {
    if (max) {
      return `Lên đến ${max} triệu VNĐ`;
    }
  }
  return `Không lương`;
};

export const convertString = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/\s+/g, ' ');
  str = str.trim();
  return str;
};

export const patternPhone = /(02|03|07|08|09|01[2|6|8|9])+([0-9]{8,9})\b/;
export const patternEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z0-9]{2,}){1,3}$/;
export const patternWebsite =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const patternNormal = /^[ a-zA-Z0-9.,&()-]+$/;


export const getTotalYearMonth = (startDate, endDate) => {
  let totalDays =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  return `${years < 1 ? '' : `${years} năm`} ${months < 1 ? '' : `${months} tháng`
    }`;
};

export const uniqueItemArray = (arr) => {
  var newArr = []
  newArr = arr.filter(item => {
    return newArr.includes(item) ? '' : newArr.push(item)
  })
  return newArr
}