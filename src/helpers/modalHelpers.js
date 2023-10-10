import React from "react";
import AddMerchantModal from "../components/Merchant/AddMerchantModal";
import AddMerchantTransactionModal from "../components/MerchantTransaction/AddMerchantTransactionModal";
import AddProducerModal from "../components/Producer/AddProducerModal";
import AddProducerTransactionModal from "../components/ProducerTransaction/AddProducerTransactionModal";
import UpdateMerchantModal from "../components/Merchant/UpdateMerchantModal";


const getAddModalByType = (modalType, props) => {
  switch (modalType) {
    case "addMerchant":
      return <AddMerchantModal {...props} />;
    case "addMerchantTransaction":
      return <AddMerchantTransactionModal {...props} />;
    case "addProducer":
      return <AddProducerModal {...props} />;
    case "addProducerTransaction":
      return <AddProducerTransactionModal {...props} />;

    default:
      return null;
  }
}

const getUpdateModalByType = (modalType, props) => {
  switch (modalType) {
    case "updateMerchant":
      return <UpdateMerchantModal {...props} />

    default:
      return null;
  }
}

export { getAddModalByType,  getUpdateModalByType};
