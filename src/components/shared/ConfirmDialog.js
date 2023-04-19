import { useEffect, useMemo, useRef, useState } from "react";

import Modal from "../../utils/modal/Modal";

const ConfirmDialog = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Modal
        onSave={props.onSave}
        onClose={props.onClose}
        title={props.title}
        show={props.showConfirm}
        isLoading={props.isLoading}
        isDialog={true}
      >
        <div className="font-bold">Bạn có chắc chắn xóa không?</div>
      </Modal>
    </>
  );
};

export default ConfirmDialog;
