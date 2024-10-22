import Swal from "sweetalert2";

export default function Swealert({ ico, mesage }) {
  const response = () => {
    Swal.fire({
      position: "top-end",
      icon: ico,
      title: mesage,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return response();
}
