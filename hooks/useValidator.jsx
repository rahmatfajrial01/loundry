import { useState } from "react"

const useValidator = (initialState) => {
    const [validator, setValidator] = useState(initialState);

    const isAllValid = () => {
        let counter = 0;

        for (let value of Object.values(validator)) {
            console.log(value)
            if (value.required) {
                if (!value.isValid) {
                    counter += 1;
                }
            }
        }

        return counter > 0 ? true : false;
    }

    return { validator, setValidator, isAllValid }
}

export default useValidator;