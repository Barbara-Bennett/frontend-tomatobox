import React from "react";
import AddNewBoxModal from "../components/Box/AddNewBoxModal";
import AddMerchantModal from "../components/Merchant/AddMerchantModal";
import AddMerchantTransactionModal from "../components/MerchantTransaction/AddMerchantTransactionModal";
import AddProducerModal from "../components/Producer/AddProducerModal";
import AddProducerTransactionModal from "../components/ProducerTransactionModal/AddProducerTransactionModal";

function getModalByType(modalType, props) {
  switch (modalType) {
    case "addBox":
      return <AddNewBoxModal {...props} />;
    case "addMerchantTransaction":
      return <AddMerchantTransactionModal {...props} />;
    case "addMerchant":
      return <AddMerchantModal {...props} />;
    case "addProducer":
      return <AddProducerModal {...props} />;
    case "addProducerTransaction":
      return <AddProducerTransactionModal {...props} />;

    default:
      return null;
  }
}

export { getModalByType };
