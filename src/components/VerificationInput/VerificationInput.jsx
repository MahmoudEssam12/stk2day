import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import styles from "./VerificationInput.module.scss";

function VerificationInput({ length, label, loading, onComplete }) {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every((num) => num !== "")) {
      inputs.current[newCode.length - 1].blur();
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  useEffect(() => {
    inputs.current[0].focus();
  }, []);

  return (
    <div className="code-input">
      <label className="code-label">{label}</label>
      <div className={styles.code_inputs}>
        {code.map((num, idx) => {
          return (
            <div key={idx} className={styles.input_wrapper}>
              <InputText
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={num}
                autoFocus={!code[0].length && idx === 0}
                readOnly={loading}
                onChange={(e) => processInput(e, idx)}
                onKeyUp={(e) => onKeyUp(e, idx)}
                ref={(ref) => inputs.current.push(ref)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VerificationInput;
