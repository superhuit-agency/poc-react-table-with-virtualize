import { useRef } from "react";
import { useTextField } from "react-aria";

import { useEffect, useState } from "react";

// export const Cell = (props) => {
//   const [val, setVal] = useState(props.defaultValue);
//   useEffect(() => {
//     setVal(props.defaultValue);
//   }, [props.defaultValue]);

//   return (
//     <input
//       value={val}
//       aria-label={props.label}
//       onChange={(e) => setVal(e.target.value)}
//     />
//   );
// };

export const Cell = (props) => {
  const [val, setVal] = useState(props.defaultValue);
  useEffect(() => {
    setVal(props.defaultValue);
  }, [props.defaultValue]);

  let ref = useRef(null);

  let { inputProps } = useTextField(
    { props, value: val, "aria-label": props.label },
    ref
  );

  return <input {...inputProps} onChange={(e) => setVal(e.target.value)} />;
};
