



  export const clipToLength = (item: string, length: number) => {
    if (!item) {
      return '';
    }
    if(item.length > length) {
      const trimedItem = item.substring(0, (length - 2));
      return trimedItem + '..';
    } else {
      return item;
    }
  }

  export const segrigateString = (writeUp: string) => {
    if(!writeUp || typeof(writeUp) !== 'string') {
      return {
        brief: '',
        explanation: ''
      }
    }
    let firstDotIndex = writeUp.indexOf('.');
    if (((firstDotIndex/writeUp.length) > 0.5) || firstDotIndex > 80) {
      firstDotIndex = 0
    }
    return {
      brief: writeUp.substring(0, firstDotIndex),
      explanation: writeUp.substring(firstDotIndex),
    }
  }
  
  export const stringifyFilter = (filter: any): string => {
    let filterString = '';
    if(!filter || (typeof(filter) !== 'object')) {
      return '';
    }
    for(const item in filter) {
      if(item && (filter[item] !== undefined) && (filter[item] !== '')) {
        filterString = filterString ? `${filterString}&` : filterString; 
        filterString += `${item}=${filter[item]}`;
      }
    }
    filterString = filterString ? `?${filterString}` : filterString; 
    return filterString;
  }

  export const formatNumber = (input: any, decimal?: number) => {
    if(isNaN(parseFloat(input))) {
      return '. .';
    }
    const number = parseFloat(input);
    return number.toLocaleString(undefined, { maximumFractionDigits: decimal || 0 });
  }

  export const parseBoolean = (bool: any) => {
    if(bool === 'true' || bool !== true) {
      return true;
    } else {
      return false;
    }
  }

  export function calculateAge(dob: any) {
    if (dob) {
      const timeGap = new Date().getTime() - new Date(dob).getTime();
      const age = Math.floor(timeGap / (1000 * 60 * 60 * 24 * 365.25));
      if (age > 0) {
        return age;
      } else {
        return 0;
      }
    } else {
      return '';
    }
  }

export function formatDate(date: any, returnValue?: string) {
  try{
    if (date) {
      const convertedDate =  new Date(date).toDateString();
      
      if (convertedDate) {
        return convertedDate;
      } else {
        return returnValue || '-';
      }
    } else {
      return returnValue || '-';
    }
  } catch(e) {
    return returnValue || '-';
  }
}
export function formatDateMini(date: any, returnValue?: string) {
  try{
    if (date) {
      const convertedDate =  new Date(date).toLocaleDateString();
      
      if (convertedDate) {
        const dateList = convertedDate.split('/');
        return `${dateList[1]}-${dateList[0]}-${dateList[2].substring(2)}`;
      } else {
        return returnValue || '-';
      }
    } else {
      return returnValue || '-';
    }
  } catch(e) {
    return returnValue || '-';
  }
}
export function formatDateMin(date: any, returnValue?: string) {
  try{
    if (date) {
      const convertedDate =  new Date(date).toLocaleDateString();
      
      if (convertedDate) {
        const dateList = convertedDate.split('/');
        return `${dateList[1]}-${dateList[0]}-${dateList[2]}`;
      } else {
        return returnValue || '-';
      }
    } else {
      return returnValue || '-';
    }
  } catch(e) {
    return returnValue || '-';
  }
}



export function acceptOnlyNumbers(event: any) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  if (/[^0-9]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}
export function acceptOnlyUppercase(event: any) {
  event.target.value = event.target.value.replace(/[^A-Z]/g, '');
  if (/[^A-Z]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}
export function convertToUppercase(event: any) {
  event.target.value = event.target.value.toLocaleUpperCase();
}

export function acceptOnlyLowercase(event: any) {
  event.target.value = event.target.value.replace(/[^a-z]/g, '');
  if (/[^a-z]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}
export function convertToLowercase(event: any) {
  event.target.value = event.target.value.toLocaleLowerCase();
}

export function acceptOnlyAlphabets(event: any) {
  event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
  if (/[^a-zA-Z]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}
export function convertStringForUrl(text: string) {
  if (!text || (typeof(text) !== 'string')) {
    return '';
  }
  const convertedText = text.replace(/[^a-zA-Z ]*$/g, '').replace(/ /g, '-');
  return convertedText;
}

export function acceptNumbersAndAlphabets(event: any) {
  event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
  if (/[^a-zA-Z0-9]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}

export function clearSpaces(event: any) {
  event.target.value = event.target.value.replace(/ /g, '');
  if (/ /.test(event.key)) {
    event.preventDefault()
    return false;
  }
}

export const getNameFromRoute = (route: string) => {
  if(!route || typeof(route) !== 'string') {
    return '';
  }
  return route.replace(/[/]/g, '').replace(/-/g, ' ');
}

export function generateDateRestriction(customYear = 0, customMonth = 0, customDay = 0) {
  const day = 24 * 60 * 60 * 1000;
  const newDate = new Date(new Date().getTime() + (customYear * day * 365) + (customMonth * day * 30) + (customDay * day));
  return new Date(newDate).toISOString().split('T')[0];
}

export function generateMinDate(customYear = 70) {
  const newDate = new Date().setFullYear(new Date().getFullYear() - customYear);
  return new Date(newDate).toISOString().split('T')[0];
}

export function generateMaxDate(customYear = 18) {
  const newDate = new Date().setFullYear(new Date().getFullYear() - customYear);
  return new Date(newDate).toISOString().split('T')[0];
}

export function filterUnsecureHTML(inputString: string) {
  if(!inputString || typeof(inputString) !== 'string') {
    return '';
  }
  const outputString = inputString
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/{{{/g, '<a target="_blank" href="')
    .replace(/}}}/g, '">')
    .replace(/{}/g, '</a>')
    .replace(/{/g, '')
    .replace(/}/g, '');
  return outputString;
}

export const formatDateToUTC = (date: any) => {
  if(!date) {
    return '';
  }
  try{
    const newDate = new Date(date.getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0];
    return newDate;
  } catch(e) {
    return '';
  }
}