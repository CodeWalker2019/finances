import { useState } from "react";

export default function WrapUnderlineOnActive({ children }: { children: (props: { isChildInFocus: boolean }) => React.ReactNode }) {
  const [isChildInFocus, setIsChildInFocus] = useState(false);

  const handleFocus = () => setIsChildInFocus(true);
  const handleBlur = () => setIsChildInFocus(false);

  return (
    <div onFocus={handleFocus} onBlur={handleBlur}>
      {children({ isChildInFocus })}
    </div>
  );
}