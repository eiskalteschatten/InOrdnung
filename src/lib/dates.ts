interface Formats {
  [locale: string]: string;
}

export const getDateLocaleFormat = (): string => {
  const formats: Formats = {
    'af-ZA': 'yyyy/MM/DD',
    'am-ET': 'd/M/yyyy',
    'ar-AE': 'DD/MM/yyyy',
    'ar-BH': 'DD/MM/yyyy',
    'ar-DZ': 'DD-MM-yyyy',
    'ar-EG': 'DD/MM/yyyy',
    'ar-IQ': 'DD/MM/yyyy',
    'ar-JO': 'DD/MM/yyyy',
    'ar-KW': 'DD/MM/yyyy',
    'ar-LB': 'DD/MM/yyyy',
    'ar-LY': 'DD/MM/yyyy',
    'ar-MA': 'DD-MM-yyyy',
    'ar-OM': 'DD/MM/yyyy',
    'ar-QA': 'DD/MM/yyyy',
    'ar-SA': 'DD/MM/yy',
    'ar-SY': 'DD/MM/yyyy',
    'ar-TN': 'DD-MM-yyyy',
    'ar-YE': 'DD/MM/yyyy',
    'arn-CL': 'DD-MM-yyyy',
    'as-IN': 'DD-MM-yyyy',
    'az-Cyrl-AZ': 'DD.MM.yyyy',
    'az-Latn-AZ': 'DD.MM.yyyy',
    'ba-RU': 'DD.MM.yy',
    'be-BY': 'DD.MM.yyyy',
    'bg-BG': 'DD.M.yyyy',
    'bn-BD': 'DD-MM-yy',
    'bn-IN': 'DD-MM-yy',
    'bo-CN': 'yyyy/M/d',
    'br-FR': 'DD/MM/yyyy',
    'bs-Cyrl-BA': 'd.M.yyyy',
    'bs-Latn-BA': 'd.M.yyyy',
    'ca-ES': 'DD/MM/yyyy',
    'co-FR': 'DD/MM/yyyy',
    'cs-CZ': 'd.M.yyyy',
    'cy-GB': 'DD/MM/yyyy',
    'da-DK': 'DD-MM-yyyy',
    'de-AT': 'DD.MM.yyyy',
    'de-CH': 'DD.MM.yyyy',
    'de-DE': 'DD.MM.yyyy',
    'de-LI': 'DD.MM.yyyy',
    'de-LU': 'DD.MM.yyyy',
    'dsb-DE': 'd. M. yyyy',
    'dv-MV': 'DD/MM/yy',
    'el-GR': 'd/M/yyyy',
    'en-029': 'MM/DD/yyyy',
    'en-AU': 'd/MM/yyyy',
    'en-BZ': 'DD/MM/yyyy',
    'en-CA': 'DD/MM/yyyy',
    'en-GB': 'DD/MM/yyyy',
    'en-IE': 'DD/MM/yyyy',
    'en-IN': 'DD-MM-yyyy',
    'en-JM': 'DD/MM/yyyy',
    'en-MY': 'd/M/yyyy',
    'en-NZ': 'd/MM/yyyy',
    'en-PH': 'M/d/yyyy',
    'en-SG': 'd/M/yyyy',
    'en-TT': 'DD/MM/yyyy',
    'en-US': 'M/d/yyyy',
    'en-ZA': 'yyyy/MM/DD',
    'en-ZW': 'M/d/yyyy',
    'es-AR': 'DD/MM/yyyy',
    'es-BO': 'DD/MM/yyyy',
    'es-CL': 'DD-MM-yyyy',
    'es-CO': 'DD/MM/yyyy',
    'es-CR': 'DD/MM/yyyy',
    'es-DO': 'DD/MM/yyyy',
    'es-EC': 'DD/MM/yyyy',
    'es-ES': 'DD/MM/yyyy',
    'es-GT': 'DD/MM/yyyy',
    'es-HN': 'DD/MM/yyyy',
    'es-MX': 'DD/MM/yyyy',
    'es-NI': 'DD/MM/yyyy',
    'es-PA': 'MM/DD/yyyy',
    'es-PE': 'DD/MM/yyyy',
    'es-PR': 'DD/MM/yyyy',
    'es-PY': 'DD/MM/yyyy',
    'es-SV': 'DD/MM/yyyy',
    'es-US': 'M/d/yyyy',
    'es-UY': 'DD/MM/yyyy',
    'es-VE': 'DD/MM/yyyy',
    'et-EE': 'd.MM.yyyy',
    'eu-ES': 'yyyy/MM/DD',
    'fa-IR': 'MM/DD/yyyy',
    'fi-FI': 'd.M.yyyy',
    'fil-PH': 'M/d/yyyy',
    'fo-FO': 'DD-MM-yyyy',
    'fr-BE': 'd/MM/yyyy',
    'fr-CA': 'yyyy-MM-DD',
    'fr-CH': 'DD.MM.yyyy',
    'fr-FR': 'DD/MM/yyyy',
    'fr-LU': 'DD/MM/yyyy',
    'fr-MC': 'DD/MM/yyyy',
    'fy-NL': 'd-M-yyyy',
    'ga-IE': 'DD/MM/yyyy',
    'gd-GB': 'DD/MM/yyyy',
    'gl-ES': 'DD/MM/yy',
    'gsw-FR': 'DD/MM/yyyy',
    'gu-IN': 'DD-MM-yy',
    'ha-Latn-NG': 'd/M/yyyy',
    'he-IL': 'DD/MM/yyyy',
    'hi-IN': 'DD-MM-yyyy',
    'hr-BA': 'd.M.yyyy.',
    'hr-HR': 'd.M.yyyy',
    'hsb-DE': 'd. M. yyyy',
    'hu-HU': 'yyyy. MM. DD.',
    'hy-AM': 'DD.MM.yyyy',
    'id-ID': 'DD/MM/yyyy',
    'ig-NG': 'd/M/yyyy',
    'ii-CN': 'yyyy/M/d',
    'is-IS': 'd.M.yyyy',
    'it-CH': 'DD.MM.yyyy',
    'it-IT': 'DD/MM/yyyy',
    'iu-Cans-CA': 'd/M/yyyy',
    'iu-Latn-CA': 'd/MM/yyyy',
    'ja-JP': 'yyyy/MM/DD',
    'ka-GE': 'DD.MM.yyyy',
    'kk-KZ': 'DD.MM.yyyy',
    'kl-GL': 'DD-MM-yyyy',
    'km-KH': 'yyyy-MM-DD',
    'kn-IN': 'DD-MM-yy',
    'ko-KR': 'yyyy-MM-DD',
    'kok-IN': 'DD-MM-yyyy',
    'ky-KG': 'DD.MM.yy',
    'lb-LU': 'DD/MM/yyyy',
    'lo-LA': 'DD/MM/yyyy',
    'lt-LT': 'yyyy.MM.DD',
    'lv-LV': 'yyyy.MM.DD.',
    'mi-NZ': 'DD/MM/yyyy',
    'mk-MK': 'DD.MM.yyyy',
    'ml-IN': 'DD-MM-yy',
    'mn-MN': 'yy.MM.DD',
    'mn-Mong-CN': 'yyyy/M/d',
    'moh-CA': 'M/d/yyyy',
    'mr-IN': 'DD-MM-yyyy',
    'ms-BN': 'DD/MM/yyyy',
    'ms-MY': 'DD/MM/yyyy',
    'mt-MT': 'DD/MM/yyyy',
    'nb-NO': 'DD.MM.yyyy',
    'ne-NP': 'M/d/yyyy',
    'nl-BE': 'd/MM/yyyy',
    'nl-NL': 'd-M-yyyy',
    'nn-NO': 'DD.MM.yyyy',
    'nso-ZA': 'yyyy/MM/DD',
    'oc-FR': 'DD/MM/yyyy',
    'or-IN': 'DD-MM-yy',
    'pa-IN': 'DD-MM-yy',
    'pl-PL': 'yyyy-MM-DD',
    'prs-AF': 'DD/MM/yy',
    'ps-AF': 'DD/MM/yy',
    'pt-BR': 'd/M/yyyy',
    'pt-PT': 'DD-MM-yyyy',
    'qut-GT': 'DD/MM/yyyy',
    'quz-BO': 'DD/MM/yyyy',
    'quz-EC': 'DD/MM/yyyy',
    'quz-PE': 'DD/MM/yyyy',
    'rm-CH': 'DD/MM/yyyy',
    'ro-RO': 'DD.MM.yyyy',
    'ru-RU': 'DD.MM.yyyy',
    'rw-RW': 'M/d/yyyy',
    'sa-IN': 'DD-MM-yyyy',
    'sah-RU': 'MM.DD.yyyy',
    'se-FI': 'd.M.yyyy',
    'se-NO': 'DD.MM.yyyy',
    'se-SE': 'yyyy-MM-DD',
    'si-LK': 'yyyy-MM-DD',
    'sk-SK': 'd. M. yyyy',
    'sl-SI': 'd.M.yyyy',
    'sma-NO': 'DD.MM.yyyy',
    'sma-SE': 'yyyy-MM-DD',
    'smj-NO': 'DD.MM.yyyy',
    'smj-SE': 'yyyy-MM-DD',
    'smn-FI': 'd.M.yyyy',
    'sms-FI': 'd.M.yyyy',
    'sq-AL': 'yyyy-MM-DD',
    'sr-Cyrl-BA': 'd.M.yyyy',
    'sr-Cyrl-CS': 'd.M.yyyy',
    'sr-Cyrl-ME': 'd.M.yyyy',
    'sr-Cyrl-RS': 'd.M.yyyy',
    'sr-Latn-BA': 'd.M.yyyy',
    'sr-Latn-CS': 'd.M.yyyy',
    'sr-Latn-ME': 'd.M.yyyy',
    'sr-Latn-RS': 'd.M.yyyy',
    'sv-FI': 'd.M.yyyy',
    'sv-SE': 'yyyy-MM-DD',
    'sw-KE': 'M/d/yyyy',
    'syr-SY': 'DD/MM/yyyy',
    'ta-IN': 'DD-MM-yyyy',
    'te-IN': 'DD-MM-yy',
    'tg-Cyrl-TJ': 'DD.MM.yy',
    'th-TH': 'd/M/yyyy',
    'tk-TM': 'DD.MM.yy',
    'tn-ZA': 'yyyy/MM/DD',
    'tr-TR': 'DD.MM.yyyy',
    'tt-RU': 'DD.MM.yyyy',
    'tzm-Latn-DZ': 'DD-MM-yyyy',
    'ug-CN': 'yyyy-M-d',
    'uk-UA': 'DD.MM.yyyy',
    'ur-PK': 'DD/MM/yyyy',
    'uz-Cyrl-UZ': 'DD.MM.yyyy',
    'uz-Latn-UZ': 'DD/MM yyyy',
    'vi-VN': 'DD/MM/yyyy',
    'wo-SN': 'DD/MM/yyyy',
    'xh-ZA': 'yyyy/MM/DD',
    'yo-NG': 'd/M/yyyy',
    'zh-CN': 'yyyy/M/d',
    'zh-HK': 'd/M/yyyy',
    'zh-MO': 'd/M/yyyy',
    'zh-SG': 'd/M/yyyy',
    'zh-TW': 'yyyy/M/d',
    'zu-ZA': 'yyyy/MM/DD',
  };

  return formats[navigator.languages[1]] || 'DD/MM/yyyy';
};
