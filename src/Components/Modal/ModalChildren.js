import React from "react";

const ModalChildren = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#0096ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          width: "95%",
          minheight: "80%",
          maxHeight: "80%",
          overflowY: "auto",
        }}
      >
        <button
          className="af-button"
          onClick={onClose}
          style={{
            marginLeft: "1%",
            marginRight: "1%",
            width: "98%",
            height: "50px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Close
        </button>
        {children}
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      ></div>
    </div>
  );
};

export default ModalChildren;
