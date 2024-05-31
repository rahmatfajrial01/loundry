const useInitialData = () => {
    const filterInit = (sortBy = "name") => ({
        search: "",
        limit: 10,
        page: 1,
        sortBy,
        order: "desc",
    });
    const clientValidation = (fields) => {
        const obj = {};
        for (let field of fields) {
            obj[field] = {
                message: "",
                isValid: true,
            };
        }

        return obj;
    };

    return { clientValidation, filterInit };
};

export default useInitialData;
