
import { Dimensions, Platform } from 'react-native';
import Config from 'react-native-config';

const window = Dimensions.get('window');
const SCREEN_HEIGHT = window.height;
const SCREEN_WIDTH = window.width;

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const Base64 = {
  btoa: (input = '') => {
    const str = input;
    let output = '';

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          'btoa failed: The string to be encoded contains characters outside of the Latin1 range.'
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  atob: (input = '') => {
    const str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 === 1) {
      throw new Error(
        'atob failed: The string to be decoded is not correctly encoded.'
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};

export const encodeBase64 = input => Base64.btoa(input);

export const toCardValid = isoDate => {
  const month = isoDate.substring(3, 5);
  const year = isoDate.substring(8, 10);
  return `${month}/${year}`;
};

export const getAuthorization = () =>
  `Basic ${Base64.btoa(`${Config.CLIENT_ID}:${Config.CLIENT_SECRET}`)}`;

export const getEncodedString = details => {
  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }

  formBody = formBody.join('&');
  return formBody;
};

export const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;

export const transformDataToSectionListPattern = (data, isDotz) => {
  if (data) {
    const transformedData = data.reduce((r, s) => {
      !isDotz && r.push({ title: s.issued_date, data: s.transactions_details });
      !!isDotz && r.push({ title: s.day, data: s.transactions });
      return r;
    }, []);
    return transformedData;
  }
  return [];
};

export const formatMoney = val =>
  val
    ? val
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
    : '0,00';

export const formatThousands = nStr => {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }

  return x1 + x2;
};

export const getSectionListArrayDataSize = (array, isDotz) => {
  let sum = 0;

  for (let count = 0; count < array.length; count++) {
    if (isDotz) {
      sum += array[count].transactions.length
        ? array[count].transactions.length
        : 1;
    } else {
      sum += array[count].transactions_details.length
        ? array[count].transactions_details.length
        : 1;
    }
  }

  return sum;
};

const monthName = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
];

export const dateFormatter = (date, showHour) => {
  if (!date) return '';
  const month = parseInt(date.substring(3, 5));
  const day = date.substring(0, 2);
  return `${day} de ${monthName[month - 1]}${
    showHour ? ` às ${date.substring(11, 16)}` : ''
    }`;
};

export const formatCellPhoneNumber = cellPhone =>
  cellPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

export const formatCPFNumber = cpf =>
  cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

export const formatCNPJNumber = cnpj =>
  cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4.$5');

export const obfuscateData = (str, type) => {
  switch (type) {
    case 'cpf':
      str = str.replace(/\D/g, '');
      return `${str.substr(0, 3)}.xxx.xxx-${str.substr(-2)}`;

    case 'cel':
      str = str.replace(/\D/g, '');
      return `(${str.substr(0, 2)}) XXXXX-${str.substr(
        str.length - 4,
        str.length
      )}`;

    case 'birthdate':
      str = str.replace(/\D/g, '');
      return `${str.substr(0, 2)}/**/****`;

    case 'email':
      return `${str.substr(0, 6)}xxxxx@${str.split('@')[1]}`;

    default:
      return `${str.substr(0, 4)}...`;
  }
};

export const moneyToFloat = value => {
  const valueAsFloat = value.replace(/\D/g, '');
  const str1 = valueAsFloat.substring(valueAsFloat.length - 2);
  const str0 = valueAsFloat.substring(0, valueAsFloat.length - 2);
  return parseFloat(`${str0}.${str1}`);
};

export const validateCNPJ = toCheck => {
  const cnpj = toCheck.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  if (cnpj.length != 14) return false;

  if (cnpj === '') return false;

  if (cnpj.length !== 14) {
    return false;
  }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    return false;

  // Valida DVs
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
};

export const validateCPF = toCheck => {
  const cpf = toCheck.replace(/[^\d]+/g, '');
  if (cpf === '') return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(9))) {
    return false;
  }
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
};

export const validateName = fieldValue => {
  if (fieldValue.trim().length > 0 && fieldValue.indexOf(' ') !== -1) {
    return true;
  }
  return false;
};

export const validate = fieldValue => {
  if (fieldValue.trim().length > 0) {
    return false;
  }
  return true;
};

export const toIsoDate = strDate => {
  let dateFormatted = strDate.split('/');
  dateFormatted = `${dateFormatted[1]}/${dateFormatted[0]}/${dateFormatted[2]}`;

  const dateObj = new Date(dateFormatted);
  if (isNaN(dateObj)) {
    return 'error';
  }
  const dateIso = dateObj.toISOString();

  return dateIso;
};

export const validateBirthdate = birthdate =>
  /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/g.test(
    birthdate.replace(/ /g, '/')
  );

export const validateCellphone = cellphone =>
  /^(?:[11-99][1-9]9[2-9]|[3-9][1-9][5-9])[0-9]{7}$/g.test(
    cellphone.replace(/[^\d]+/g, '')
  );

export const validateEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export const getURLGanheOnline = () => Config.GANHE_ONLINE_URL;
