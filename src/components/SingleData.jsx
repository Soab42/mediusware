import React from "react";

export default function SingleData({ data }) {
  const { name, status } = data || {};
  return (
    <tr>
      <th scope="col">{name}</th>
      <th scope="col">{status}</th>
    </tr>
  );
}
