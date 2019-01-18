import React from "react";

import queryString from "query-string";

const getDate = Child => {
  return props => {
    const params = queryString.parse(props.location.search);

    const date = params.date ? params.date : null;

    return <Child {...props} date={date} />;
  };
};

export default getDate;
