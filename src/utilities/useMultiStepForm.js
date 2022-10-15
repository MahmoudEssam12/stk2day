import { useState } from "react";
import { useTranslation } from "next-i18next";
const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
export default function useMultiStepForm(steps, values) {
    const { t } = useTranslation();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [errors, setErrors] = useState({});


    function next() {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
        console.log("next", currentStepIndex)
    }

    function back() {
        setCurrentStepIndex(i => {
            if (i <= 0) return i;
            return i - 1
        })
    }

    function goTo(index) {
        setCurrentStepIndex(index)
    }

    const testRegex = (name) => {
        const value = values[name];
        if (name === "email") {
            return emailRegex.test(value);
        }
        if (name === "password") {
            return passwordRegex.test(value);
        }
    };

    const validate = (name, value) => {
        if (name === "firstname" && values.firstname.length < 1) {
            setErrors((prev) => {
                return { ...prev, [name]: t("register:firstname_validation") };
            });
        } else {
            setErrors((prev) => {
                let obj = { ...prev };
                delete obj.firstname;
                return obj;
            });
        }
        if (name === "lastname" && values.lastname.length < 1) {
            setErrors((prev) => {
                return { ...prev, [name]: t("register:lastname_validation") };
            });
        } else {
            setErrors((prev) => {
                let obj = { ...prev };
                delete obj.lastname;
                return obj;
            });
        }
        console.log("errs", errors);
        console.log("val", values);

        // if(name )
    };

    return {
        currentStepIndex,
        steps: steps,
        step: steps[currentStepIndex],
        next,
        back,
        goTo,
        validate,
        errors
    }
}