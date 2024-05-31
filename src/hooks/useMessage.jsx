import Swal from "sweetalert2";

const useMessage = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
    });

    const success = (response) => {
        const { status, statusText } = response;
        Toast.fire({
            icon: "success",
            title: `${status}: ${statusText}`,
        });
    };

    const error = (error) => {
        const { data, status, statusText } = error.response;
        Toast.fire({
            icon: "warning",
            title: data.detail || `${status}: ${statusText}`,
        });
    };

    const confirmRemove = (action) => {
        Swal.fire({
            title: "Confirm Remove",
            text: "Are you sure to delete this data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, sure!",
        }).then((result) => {
            if (result.isConfirmed) {
                action();
            }
        });
    };

    return { success, error, confirmRemove };
};

export default useMessage;
