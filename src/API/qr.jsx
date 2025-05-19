import React from "react";
import QRCode from "react-qr-code";

const MiQR = ({ valor, size }) => {
  return <QRCode value={valor} size={size} />;
};

export default MiQR;
