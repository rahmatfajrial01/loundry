const useInput = (dataSetter, validationSetter = null) => {
    const handler = (e) => {
        const name = e.target.name;
        const type = e.target.type;
        let value = e.target.value;

        if (type === "number") {
            value = Number(value.replace(/\D/g, ""));
        }

        dataSetter((data) => ({ ...data, [name]: value }));
        if (validationSetter) {
            validationSetter((data) => ({
                ...data,
                [name]: {
                    message: e.target.validationMessage,
                    isValid: e.target.checkValidity(),
                },
            }));
        }
    };

    return { handler };
};

export default useInput;
