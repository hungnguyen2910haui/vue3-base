import Swal from "sweetalert2";

const confirmModal = {};
confirmModal.success = (message, options) =>
  new Promise((resolve) => {
    const defaultOptions = {
      title: "",
      icon: "success",
      html: message,
      cancelButtonText: "Đóng",
      buttonsStyling: false,
      showConfirmButton: false,
      showCancelButton: true,
      customClass: {
        closeButton: "btn-sm",
        actions: "actions-class",
        cancelButton: "btn btn-primary",
      },
    };

    Swal.fire({ ...options, ...defaultOptions }).then((result) => {
      resolve(result);
    });
  });

confirmModal.confirm = (message, options) =>
  new Promise((resolve) => {
    const defaultOptions = {
      title: "",
      html: message,
      icon: "question",
      cancelButtonText: "Đóng",
      confirmButtonText: "Xác nhận",
      buttonsStyling: false,
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      customClass: {
        closeButton: "btn-sm",
        actions: "actions-class",
        confirmButton: "btn btn-primary px-4 mr-2",
        cancelButton: "btn btn-secondary px-4",
        confirmButtonText: "btn btn-primary px-4",
      },
    };

    Swal.fire({ ...options, ...defaultOptions }).then((result) => {
      resolve(result);
    });
  });

confirmModal.error = (message, options) =>
  new Promise((resolve) => {
    const defaultOptions = {
      title: "",
      icon: "error",
      html: message,
      cancelButtonText: "Đóng",
      buttonsStyling: false,
      showConfirmButton: false,
      showCancelButton: true,
      allowOutsideClick: false,
      customClass: {
        closeButton: "btn-sm",
        actions: "actions-class",
        cancelButton: "btn btn-primary px-4",
      },
    };
    Swal.fire({ ...options, ...defaultOptions }).then((result) => {
      resolve(result);
    });
  });

confirmModal.warning = (message, options) =>
  new Promise((resolve) => {
    const defaultOptions = {
      title: "",
      html: message,
      icon: "warning",
      cancelButtonText: "Đóng",
      buttonsStyling: false,
      showConfirmButton: false,
      showCancelButton: true,
      customClass: {
        closeButton: "btn-sm",
        actions: "actions-class",
        confirmButton: "btn btn-default",
        cancelButton: "btn btn-default",
        confirmButtonText: "btn btn-warning",
      },
    };

    Swal.fire({ ...options, ...defaultOptions }).then((result) => {
      resolve(result);
    });
  });

confirmModal.isVisible = () => {
  return Swal.isVisible();
};

confirmModal.close = () => {
  return Swal.close();
};

export default confirmModal;
