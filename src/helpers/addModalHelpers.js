import React from "react";
import AddProducerModal from "../components/Producer/AddProducerModal";
import AddMerchantTransactionModal from "../components/MerchantTransaction/AddMerchantTransactionModal";

function getModalByType(modalType, props) {
  switch (modalType) {
    case "addProducer":
      return <AddProducerModal {...props} />;
    case "addMerchantTransaction":
        return <AddMerchantTransactionModal {... props} />
    default:
      return null;
  }
}

export { getModalByType };
