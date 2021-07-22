const cssValueSuggestions = [
  {
    value: '5px',
    label: '5px',
  },
  {
    value: '10px',
    label: '10px',
  },
  {
    value: '50%',
    label: '50%',
  },
  {
    value: '100%',
    label: '100%',
  },
];

const createFilter = (queryString: string) => (value: any) => (
  value.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
);
const querySearch = (queryString: string, cb: Function) => {
  const results = queryString
    ? cssValueSuggestions.filter(createFilter(queryString))
    : cssValueSuggestions;
  // 调用 callback 返回建议列表的数据
  cb(results);
};

const queryMarginPadding = (property: string, position: string) => (queryString: string, cb: Function) => {
  const results: Array<{
    value: string,
    label: string,
    keys: string[],
  }> = [...cssValueSuggestions];
  if (position === 'top-bottom') {
    results.push({
      value: queryString,
      label: `set top and bottom to ${queryString}`,
      keys: [`${property}Top`, `${property}Bottom`],
    });
  }
  if (position === 'left-right') {
    results.push({
      value: queryString,
      label: `set left and right to ${queryString}`,
      keys: [`${property}Left`, `${property}Right`],
    });
  }
  results.push({
    value: queryString,
    label: `set all to ${queryString}`,
    keys: [`${property}Top`, `${property}Bottom`, `${property}Left`, `${property}Right`],
  });
  cb(results);
};

export {
  querySearch,
  queryMarginPadding,
};