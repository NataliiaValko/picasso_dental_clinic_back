import { ctrlWrapper } from "../../helpers/index.js";

import sendAppointment from "./sendAppointment.js";
import sendCall from "./sendCall.js";
import sendConsultation from "./sendConsultation.js";

export default {
  sendAppointment: ctrlWrapper(sendAppointment),
  sendCall: ctrlWrapper(sendCall),
  sendConsultation: ctrlWrapper(sendConsultation),
};
