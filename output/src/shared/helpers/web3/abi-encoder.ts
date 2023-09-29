import { EMPTY_STRING } from 'shared/constants';

const ARGS_TYPE_PATTERN = /([a-zA-Z0-9]+)(\[(\d*)\])?/;

const getTypeInfo = (type: string) => {
  const matchResult = type.match(ARGS_TYPE_PATTERN);
  if (!matchResult)
    return { actualType: EMPTY_STRING, argCount: undefined, isArray: false };
  const [, _type, isArray, argCount] = Array.from(matchResult);

  return {
    actualType: _type,
    isArray: Boolean(isArray),
    argCount: argCount ? Number(argCount) : undefined,
  };
};

const getPlaceholder = (type: string) => {
  const _getPlaceholder = (_type: string) => {
    let _val: number | string = EMPTY_STRING;
    switch (_type) {
      case 'uint':
      case 'uint8':
      case 'uint16':
      case 'uint256':
        _val = 111222333;
        break;

      case 'bytes':
      case 'bytes32':
        _val = '0x112233...';
        break;

      case 'bytes4':
        _val = '0x12345678';
        break;

      case 'address':
        _val = '0x11...22';
        break;

      case 'bool':
        _val = 'true';
        break;

      case 'tuple':
        _val = '[ ... ]';
        break;

      default:
        _val = 'hello';
    }

    return _val;
  };

  const { actualType, isArray, argCount } = getTypeInfo(type);

  if (actualType === 'tuple') {
    return isArray
      ? `[${_getPlaceholder(actualType)}]`
      : _getPlaceholder(actualType);
  }

  if (isArray) {
    const values = Array(argCount || 1)
      .fill(0)
      .map(() => `"${_getPlaceholder(actualType)}"`);
    return `[${values.join(',')}]`;
  }

  return _getPlaceholder(type).toString();
};

export { getPlaceholder };
