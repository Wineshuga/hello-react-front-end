import React from "react";

import { useSelector } from 'react-redux';

const Greeting = () => {
  const { message, isLoading, isError, errorMsg } = useSelector((store) => store.message);

  if (isLoading) {
    return (<h1>Loading Greeting</h1>);
  }

  if (isError) {
    return (<h1>{ errorMsg }</h1>);
  }

  return (
    <h1>{ message.greeting }</h1>
  )
}
export default Greeting